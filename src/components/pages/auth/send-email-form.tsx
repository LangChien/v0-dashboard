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
import { useFormSubmit } from '@/hooks/use-form-submit'

import { authRequest } from '@/services/routes/auth.request'
import { SendOtpEmailSchema } from '@/services/schemas/auth.schema'
import { SendOtpEmailBodyDto } from '@/services/types/auth.dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { VerifyForgotPasswordOTPForm } from './verify-otp'

export const SendEmailForm = () => {
  const form = useForm<SendOtpEmailBodyDto>({
    resolver: zodResolver(SendOtpEmailSchema),
    defaultValues: {
      otpType: 'FORGOT_PASSWORD',
    },
  })
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathName = usePathname()
  // handle set searchparams, ?email=...
  const handleSetEmail = (email: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('email', email)
    replace(`${pathName}?${params}`)
  }

  const email = searchParams.get('email') || ''
  const handleClose = () => {
    const params = new URLSearchParams(searchParams)
    params.delete('email')
    replace(`${pathName}?${params}`)
  }

  const onSubmit = useFormSubmit(async (values: SendOtpEmailBodyDto) => {
    const res = await authRequest.sendOtpEmail(values)
    handleSetEmail(values.email)
    return res
  }, form.setError)

  return (
    <Fragment>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white'>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Nhập email của bạn' type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='w-full bg-blue-600 hover:bg-blue-700 text-white mt-2' type='submit'>
            Tiếp tục
          </Button>
        </form>
      </Form>
      <VerifyForgotPasswordOTPForm handleClose={handleClose} email={email} />
    </Fragment>
  )
}
