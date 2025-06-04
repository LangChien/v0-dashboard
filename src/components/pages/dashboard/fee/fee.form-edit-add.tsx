'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
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
import { useFormSubmit } from '@/hooks/use-form-submit'
import { cn } from '@/lib/utils'
import { feeRequest } from '@/services/routes/fee.request'
import { CreateFeeSchema } from '@/services/schemas/fee.schema'
import { CreateFeeDto, FeeInludeCount } from '@/services/types/fee.dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'

export const UpdateFeeForm = (props: { fee: FeeInludeCount }) => <CreateFeeForm {...props} />
export const CreateFeeForm = ({ fee }: { fee?: FeeInludeCount }) => {
  const form = useForm<CreateFeeDto>({
    resolver: zodResolver(CreateFeeSchema),
    defaultValues: {
      ...fee,
      isMandatory: fee?.isMandatory ?? true,
    },
  })
  const onSubmit = useFormSubmit(
    async (values: CreateFeeDto) => {
      if (fee) return feeRequest.update(fee.id, values)
      else return feeRequest.create(values)
    },
    form.setError,
    '/dashboard/fee',
  )
  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='gap-5 flex flex-col'>
          <FormField
            control={form.control}
            name='isMandatory'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center space-x-3 space-y-0 '>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>Bắt buộc</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <div className='grid grid-cols-2 gap-5'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='capitalize'>Tên khoản thu</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập tên khoản thu' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='dueDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hạn nộp</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn('w-full', !field.value && 'text-muted-foreground')}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Chọn Hạn nộp</span>}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={new Date(field.value)}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date('1900-01-01')}
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
              name='amount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='capitalize'>Số tiền</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Nhập số tiền'
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
              name='totalHouseholds'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='capitalize'>số hộ phải đóng</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Nhập số hộ phải đóng'
                      type='number'
                      {...field}
                      onChange={(e) => field.onChange(+e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='capitalize'>mô tả</FormLabel>
                <FormControl>
                  <Input placeholder='Nhập mô tả' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='w-full'>
            {fee ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </form>
      </Form>
    </FormProvider>
  )
}
