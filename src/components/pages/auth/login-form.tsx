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
import { Input } from '@/components/ui/input'
import { useUser } from '@/hooks/use-account'
import { useFormSubmit } from '@/hooks/use-form-submit'
import { authRequest } from '@/services/routes/auth.request'
import { LoginSchema } from '@/services/schemas/auth.schema'
import { LoginBodyDto } from '@/services/types/auth.dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

export const LoginForm = () => {
  const searchParam = useSearchParams()
  const redirectUrl = searchParam.get('redirectUrl') || '/dashboard/protected/profile'

  const form = useForm<LoginBodyDto>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {},
  })
  const setUser = useUser((state) => state.setUser)
  const onSubmit = useFormSubmit(
    async (values: LoginBodyDto) => {
      const res = await authRequest.login(values)
      setUser(res.data.user)
      return res
    },
    form.setError,
    redirectUrl,
  )
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white'>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='Nhập email'
                  type='email'
                  {...field}
                  className='bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-blue-500'
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
                <PasswordInput
                  placeholder='Nhập mật khẩu'
                  type='password'
                  {...field}
                  className='bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-blue-500'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white mt-2'>
          Đăng nhập
        </Button>
      </form>
    </Form>
  )
}
