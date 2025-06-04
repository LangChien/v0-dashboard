'use client'

import { Button } from '@/components/ui/button'

import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFormSubmit } from '@/hooks/use-form-submit'

import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { GENDER_LABELS } from '@/services/enum-label'
import { citizenRequest } from '@/services/routes/citizen.request'
import { CreateCitizenSchema, GENDER } from '@/services/schemas/citizen.schema'
import { Citizen, CreateCitizenDto } from '@/services/types/citizen.dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

export const UpdateCitizenForm = (props: { citizen: Citizen }) => <CreateCitizenForm {...props} />
export const CreateCitizenForm = ({ citizen }: { citizen?: Citizen }) => {
  const form = useForm<CreateCitizenDto>({
    resolver: zodResolver(CreateCitizenSchema),
    defaultValues: {
      ...citizen,
    },
  })
  const onSubmit = useFormSubmit(
    async (values: CreateCitizenDto) => {
      let res = undefined
      if (citizen) res = await citizenRequest.update(citizen.id, values)
      else res = await citizenRequest.create(values)
      return res
    },
    form.setError,
    '/dashboard/citizen',
  )
  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='gap-5 flex flex-col'>
          <FormField
            control={form.control}
            name='fullName'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='capitalize'>Họ và tên</FormLabel>
                <FormControl>
                  <Input placeholder='Nhập Họ và tên' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-3 gap-y-5 gap-x-5 md:gap-x-10'>
            <FormField
              control={form.control}
              name='gender'
              render={({ field }) => (
                <FormItem className='min-w-[200px]'>
                  <FormLabel>Giới Tính</FormLabel>
                  <Select onValueChange={(e) => field.onChange(e)} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Chọn giới tính' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(GENDER).map((gender) => (
                        <SelectItem value={gender} key={`gender-${gender}`}>
                          {GENDER_LABELS[gender]}
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
              name='age'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='capitalize'>Tuổi</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Nhập tuổi'
                      type='number'
                      {...field}
                      onChange={(e) => field.onChange(+e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='dateOfBirth'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày Sinh</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn('w-full', !field.value && 'text-muted-foreground')}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Chọn ngày sinh</span>}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={new Date(field.value)}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='ethnicity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='capitalize'>Dân Tộc</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập dân tộc' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='religion'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='capitalize'>Tôn Giáo</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập tôn giáo' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='occupation'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='capitalize'>Nghề Nghiệp</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập nghề nghiệp' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='nationalId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='capitalize'>Số CMND/CCCD</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập số CMND/CCCD' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{' '}
            <FormField
              control={form.control}
              name='issuePlace'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='capitalize'>Nơi Cấp</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập nơi cấp' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='issueDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày Cấp</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn('w-full', !field.value && 'text-muted-foreground')}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Chọn ngày cấp</span>}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={new Date(field.value)}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type='submit' className='w-full'>
            {citizen ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </form>
      </Form>
    </FormProvider>
  )
}
