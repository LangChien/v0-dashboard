'use client'

import { PasswordInput } from '@/components/common/custom-input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useUser } from '@/hooks/use-account'
import { useFormSubmit } from '@/hooks/use-form-submit'
import { authRequest } from '@/services/routes/auth.request'
import { ResetPasswordSchema } from '@/services/schemas/auth.schema'
import { ResetPasswordBodyDto } from '@/services/types/auth.dto'

import { zodResolver } from '@hookform/resolvers/zod'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'

export const ResetPasswordForm = () => {
  const form = useForm<ResetPasswordBodyDto>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      otpToken: '',
    },
  })
  const setUser = useUser((state) => state.setUser)
  const onSubmit = useFormSubmit(
    async (values: ResetPasswordBodyDto) => {
      const res = await authRequest.resetPassword(values)
      setUser(res.data.user)
      return res
    },
    form.setError,
    '/dashboard/protected/profile',
  )
  return (
    <Fragment>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white'>Mật khẩu mới</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder='Nhập mật khẩu mới của bạn'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white'>Xác nhận mật khẩu</FormLabel>
                <FormControl>
                  <PasswordInput placeholder='Xác nhận lại mật khẩu' type='password' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            variant='destructive'
            className='w-full bg-blue-600 hover:bg-blue-700 text-white mt-2'
          >
            Xác nhận
          </Button>
        </form>
      </Form>
    </Fragment>
  )
}
