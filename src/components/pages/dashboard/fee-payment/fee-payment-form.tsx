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
import { useFormSubmit } from '@/hooks/use-form-submit'
import { cn } from '@/lib/utils'
import { paymentRequest } from '@/services/routes/payment.request'
import { CreatePaymentSchema } from '@/services/schemas/payment.schema'
import { CreatePaymentDto, PaymentIncludeHouseholdAndCitizen } from '@/services/types/payment.dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'

export const UpdatePaymentForm = (props: { payment: PaymentIncludeHouseholdAndCitizen }) => (
  <CreatePaymentForm {...props} />
)
export const CreatePaymentForm = ({ payment }: { payment?: PaymentIncludeHouseholdAndCitizen }) => {
  const form = useForm<CreatePaymentDto>({
    resolver: zodResolver(CreatePaymentSchema),
    defaultValues: payment,
  })
  const onSubmit = useFormSubmit(
    async (values: CreatePaymentDto) => {
      if (payment) return paymentRequest.update(payment.id, values)
      else return paymentRequest.create(values)
    },
    form.setError,
    '/dashboard/fee/payment',
  )
  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='gap-5 flex flex-col'>
          <div className='grid grid-cols-2 gap-5'>
            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem className='col-span-2'>
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
              name='payerName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='capitalize'>Nội dung giao dịch</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập nội dung giao dịch' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='createdAt'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày nộp (tùy chọn)</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn('w-full', !field.value && 'text-muted-foreground')}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Ngày nộp</span>}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
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
              name='feeId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='capitalize'>mã khoản thu</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập mã khoản thu' {...field} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='householdId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='capitalize'>mã căn hộ</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập mã căn hộ' {...field} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type='submit' className='w-full'>
            {payment ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </form>
      </Form>
    </FormProvider>
  )
}
