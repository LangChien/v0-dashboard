'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useFormSubmit } from '@/hooks/use-form-submit'
import { cn, formatDateString } from '@/lib/utils'
import { GENDER_LABELS, REL_HEAD_LABELS } from '@/services/enum-label'
import { memberRequest } from '@/services/routes/member.request'
import { REL_HEAD, SplitHouseholdSchema } from '@/services/schemas/member.schema'
import { MemberIncludeHouseholdAndCitizen, SplitHouseholdDto } from '@/services/types/member.dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const SplitForm = (props: {
  householdId: string
  members: MemberIncludeHouseholdAndCitizen[]
}) => {
  const { householdId, members } = props
  const [headCitizenId, setHeadCitizenId] = useState<string>()
  const [membersToMove, setMembersToMove] = useState<
    { memberId: string; relationWithNewHead: REL_HEAD }[]
  >([])
  const router = useRouter()
  const form = useForm<SplitHouseholdDto>({
    resolver: zodResolver(SplitHouseholdSchema),
    defaultValues: {
      membersToMove: [],
    },
  })
  const handleRequest = useFormSubmit(
    (body: SplitHouseholdDto) => memberRequest.splitHousehold(householdId, body),
    form.setError,
  )
  const onSubmit = async (values: SplitHouseholdDto) => {
    if (membersToMove.length !== members.length - 1) {
      toast.error('Vui lòng cập nhật quan hệ cho tất cả thành viên')
      return
    }
    const res = await handleRequest({
      ...values,
      membersToMove,
    })
    if (res) router.push(`/dashboard/household/${res.data.id}/profile`)
  }
  return (
    <Fragment>
      <div className='text-2xl font-bold flex items-center gap-2 justify-start'>
        <Pencil />
        <h1>Tách hộ</h1>
      </div>
      <Separator className='mb-5' />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='gap-5 flex flex-col'>
          <FormField
            control={form.control}
            name='headCitizenId'
            render={({ field }) => (
              <FormItem className='max-w-[400px]'>
                <FormLabel>Chủ căn hộ</FormLabel>
                <Select
                  onValueChange={(v) => {
                    field.onChange(v)
                    setHeadCitizenId(v)
                    setMembersToMove([])
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Chọn chủ căn hộ mới' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {members.map((m) => (
                      <SelectItem key={m.id} value={m.citizen.id}>
                        {m.citizen.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='houseNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='capitalize'>số nhà</FormLabel>
                <FormControl>
                  <Input placeholder='Nhập số nhà' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='capitalize'>địa chỉ</FormLabel>
                <FormControl>
                  <Input placeholder='Nhập địa chỉ' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel className='capitalize'>
              Quan hệ giữa các thành viên với chủ căn hộ mới
            </FormLabel>
            <FormControl>
              <div className={cn('grid grid-cols-3 gap-4', !headCitizenId && 'hidden')}>
                {members
                  .filter((m) => m.citizen.id !== headCitizenId)
                  .map((member) => (
                    <Select
                      onValueChange={(v) => {
                        setMembersToMove((prev) => {
                          const index = prev.findIndex((m) => m.memberId === member.id)
                          if (index !== -1) {
                            return [
                              ...prev.slice(0, index),
                              { ...prev[index], relationWithNewHead: v as REL_HEAD },
                              ...prev.slice(index + 1),
                            ]
                          }
                          return [
                            ...prev,
                            { memberId: member.id, relationWithNewHead: v as REL_HEAD },
                          ]
                        })
                      }}
                      key={`${member.id}-item`}
                    >
                      <label
                        className={cn(
                          'w-full flex flex-col gap-2 border p-3 rounded-lg cursor-pointer',
                        )}
                      >
                        <p>{member.citizen.fullName}</p>
                        <p className='space-x-2'>
                          <span>{member.citizen.age} tuổi</span>
                          <span>{GENDER_LABELS[member.citizen.gender]}</span>
                        </p>
                        <p>{'Ngày sinh ' + formatDateString(member.citizen.dateOfBirth)}</p>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              <p className='text-red-500 font-bold'>Vui lòng cập nhật</p>
                            }
                          />
                        </SelectTrigger>
                      </label>
                      <SelectContent>
                        {Object.values(REL_HEAD).map((r) => (
                          <SelectItem key={r} value={r}>
                            {REL_HEAD_LABELS[r]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
          <Button type='submit' className='w-full'>
            Cập nhật
          </Button>
        </form>
      </Form>
    </Fragment>
  )
}
