'use client'

import { CustomInput } from '@/components/common/custom-input'
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
import { useFormSubmit } from '@/hooks/use-form-submit'
import { useRequest } from '@/hooks/use-request'
import { citizenRequest } from '@/services/routes/citizen.request'
import { householdRequest } from '@/services/routes/household.request'
import { CreateHouseholdSchema } from '@/services/schemas/household.schema'
import { Citizen } from '@/services/types/citizen.dto'
import { CreateHouseholdDto, Household } from '@/services/types/household.dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form'

export const UpdateHouseholdForm = (props: { household: Household }) => (
  <CreateHouseholdForm {...props} />
)
export const CreateHouseholdForm = ({ household }: { household?: Household }) => {
  const [citizen, setCitizen] = useState<Citizen | null>(null)
  const form: UseFormReturn<CreateHouseholdDto, any, CreateHouseholdDto> =
    useForm<CreateHouseholdDto>({
      resolver: zodResolver(CreateHouseholdSchema),
      defaultValues: household,
    })
  const onSubmit = useFormSubmit(
    async (values: CreateHouseholdDto) => {
      if (household) return householdRequest.update(household.id, values)
      else return householdRequest.create(values)
    },
    form.setError,
    '/dashboard/household',
  )
  const handleCheckHeadCitizenId = useRequest(async () => {
    form.clearErrors()
    const headCitizenId = form.getValues('headCitizenId')
    const res = await citizenRequest.getOneByIdOrNull(headCitizenId)
    if (!res)
      form.setError('headCitizenId', {
        type: 'manual',
        message: 'Mã uuid chủ hộ không hợp lệ hoặc không tồn tại',
      })
    else {
      setCitizen(res.data)
    }
    return res
  })
  const handleResetCitizen = () => {
    form.setValue('headCitizenId', '')
    setCitizen(null)
  }
  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='gap-5 flex flex-col'>
          <FormField
            control={form.control}
            name='headCitizenId'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='capitalize'>mã uuid chủ hộ</FormLabel>
                <FormControl>
                  <CustomInput
                    disabled={!!citizen}
                    labelButton='Kiểm tra'
                    onClickButton={handleCheckHeadCitizenId}
                    placeholder='Nhập mã uuid chủ hộ'
                    {...field}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {citizen && (
            <div>
              <FormLabel className='capitalize'>chủ hộ</FormLabel>
              <CustomInput
                labelButton='Thay đổi'
                disabledButton={false}
                disabled={!!citizen}
                onClickButton={handleResetCitizen}
                value={citizen.fullName}
              />
            </div>
          )}

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

          <Button type='submit' className='w-full'>
            {household ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </form>
      </Form>
    </FormProvider>
  )
}
