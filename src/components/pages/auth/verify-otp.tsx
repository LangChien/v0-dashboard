'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { useRequest } from '@/hooks/use-request'
import { authRequest } from '@/services/routes/auth.request'
import { VerifyOtpSchema } from '@/services/schemas/auth.schema'
import { VerifyOTPBodyDto } from '@/services/types/auth.dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FieldErrors, useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface VerifyEmailFormProps {
  email: string
  handleClose: () => void
}

export const VerifyForgotPasswordOTPForm = ({ email, handleClose }: VerifyEmailFormProps) => {
  const router = useRouter()
  const handleBack = () => router.push('/restore-password')
  const form = useForm<VerifyOTPBodyDto>({
    resolver: zodResolver(VerifyOtpSchema),
    defaultValues: {
      email,
      otpType: 'FORGOT_PASSWORD',
    },
  })
  const onSubmit = useRequest((data: VerifyOTPBodyDto) => {
    return authRequest.verifyOtpEmail(data)
  }, '/reset-password')

  const handlerError = (error: FieldErrors<VerifyOTPBodyDto>) => {
    toast.error(error.email?.message ?? error.otp?.message)
  }

  const handleResend = useRequest(() => {
    return authRequest.sendOtpEmail({ email, otpType: 'FORGOT_PASSWORD' })
  })

  useEffect(() => {
    if (!email) return
    form.setValue('email', email)
  }, [email, form])
  return (
    <Dialog
      open={!!email.length}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose()
        form.reset()
      }}
    >
      <DialogContent className='sm:max-w-[425px] p-0 overflow-hidden'>
        <DialogHeader className='bg-[#f4f6f8] py-5'>
          <DialogTitle className='text-xl text-center'>Khôi phục mật khẩu</DialogTitle>
          <DialogDescription className='text-center text-gray-500'></DialogDescription>
        </DialogHeader>
        <div className='p-5 w-full'>
          <p className='text-center text-lg'>
            Nhập mã OTP được gửi qua email <span className='font-semibold'>{email}</span>
          </p>
          <div className='flex justify-center py-5 w-full'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit, handlerError)}
                className=' space-y-6 w-full'
              >
                <FormField
                  control={form.control}
                  name='otp'
                  render={({ field }) => (
                    <FormItem className='flex justify-center'>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button size='lg' variant='destructive' type='submit' className='w-full'>
                  Xác nhận
                </Button>
              </form>
            </Form>
          </div>
          <div className='flex items-center justify-center gap-5'>
            <Button
              className='border-blue-600 text-blue-500'
              size='lg'
              variant='outline'
              onClick={handleBack}
            >
              Quay lại
            </Button>
            <Button
              className='border-blue-600 text-blue-500'
              size='lg'
              variant='outline'
              onClick={handleResend}
            >
              Gửi lại OTP
            </Button>
          </div>
          <p className='text-center text-gray-500 my-5'>Mã OTP có thời hạn 5 phút</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
