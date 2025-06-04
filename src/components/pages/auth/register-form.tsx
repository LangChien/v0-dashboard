'use client'

import { CustomInput, PasswordInput } from '@/components/common/custom-input'
import { Button } from '@/components/ui/button'
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
import { useUser } from '@/hooks/use-account'
import { useFormSubmit } from '@/hooks/use-form-submit'
import { authRequest } from '@/services/routes/auth.request'
import { RegisterSchema } from '@/services/schemas/auth.schema'
import { RegisterBodyDto } from '@/services/types/auth.dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { VerifyOtpForm } from './verify-email-form'

export const RegisterForm = () => {
  const form = useForm<RegisterBodyDto>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      isAcceptTerms: false,
      otpToken: '',
    },
  })
  const setUser = useUser((state) => state.setUser)
  const [email, setEmail] = useState<string | null>(null)
  const [isVerifyEmail, setIsVerifyEmail] = useState(false)

  const onSubmit = useFormSubmit(
    async (values: RegisterBodyDto) => {
      const res = await authRequest.register(values)
      setUser(res.data.user)
      return res
    },
    form.setError,
    '/dashboard/protected/profile',
  )
  const handleSendOtp = useFormSubmit(async () => {
    form.clearErrors()
    const email = form.getValues('email')
    const res = await authRequest.sendOtpEmail({
      otpType: 'VERIFY_EMAIL',
      email,
    })
    setEmail(email)
    return res
  }, form.setError)
  return (
    <Fragment>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          <div className='flex gap-5'>
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Họ</FormLabel>
                  <FormControl>
                    <Input autoComplete='off' placeholder='Nhập họ' type='text' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />{' '}
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Tên</FormLabel>
                  <FormControl>
                    <Input autoComplete='off' placeholder='Nhập tên' type='text' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white'>Email</FormLabel>
                <FormControl>
                  <CustomInput
                    disabled={isVerifyEmail}
                    autoComplete='off'
                    placeholder='Nhập email'
                    type='email'
                    {...field}
                    labelButton='Gửi otp'
                    onClickButton={handleSendOtp}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white'>Mật khẩu</FormLabel>
                <FormControl>
                  <PasswordInput autoComplete='off' placeholder='Nhập mật khẩu' {...field} />
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
                <FormLabel className='text-white'>Nhập lại mật khẩu</FormLabel>
                <FormControl>
                  <PasswordInput
                    autoComplete='off'
                    placeholder='Xác nhận lại mật khẩu'
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
            name='isAcceptTerms'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='flex items-center space-x-2'>
                    <Checkbox id='terms' checked={field.value} onCheckedChange={field.onChange} />
                    <label
                      htmlFor='terms'
                      className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-white'
                    >
                      Tôi đồng ý với các điều khoản bảo mật cá nhân
                    </label>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={!isVerifyEmail}
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 text-white mt-2'
          >
            Đăng ký
          </Button>
        </form>
      </Form>
      <VerifyOtpForm setIsVerifyEmail={setIsVerifyEmail} setEmail={setEmail} email={email} />
    </Fragment>
  )
}
