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
import { Dispatch, SetStateAction, useEffect } from 'react'
import { FieldErrors, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const VerifyOtpForm = ({
  email,
  setEmail,
  setIsVerifyEmail,
}: {
  email: string | null
  setEmail: Dispatch<SetStateAction<string | null>>
  setIsVerifyEmail: Dispatch<SetStateAction<boolean>>
}) => {
  const form = useForm<VerifyOTPBodyDto>({
    resolver: zodResolver(VerifyOtpSchema),
    defaultValues: {
      otp: '',
      email: email || '',
      otpType: 'VERIFY_EMAIL',
    },
  })
  const onSubmit = useRequest(async (data: VerifyOTPBodyDto) => {
    const res = await authRequest.verifyOtpEmail({
      ...data,
      email: email!,
      otpType: 'VERIFY_EMAIL',
    })
    handleClose()
    setIsVerifyEmail(true)
    return res
  })
  const handlerError = (
    error: FieldErrors<{
      otp: string
    }>,
  ) => {
    toast.error(error.otp?.message)
  }
  const handleResend = useRequest(() => {
    return authRequest.sendOtpEmail({ email: email!, otpType: 'VERIFY_EMAIL' })
  })
  const handleClose = () => {
    setEmail(null)
    form.reset()
  }
  useEffect(() => {
    if (email) form.setValue('email', email)
  }, [email, form])
  return (
    <Dialog
      defaultOpen={false}
      open={!!email}
      onOpenChange={(open) => {
        if (!open) handleClose()
      }}
    >
      <DialogContent className='sm:max-w-[425px] p-0 overflow-hidden'>
        <DialogHeader className='bg-[#f4f6f8] py-5'>
          <DialogTitle className='text-xl text-center'>Xác thực email</DialogTitle>
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
              onClick={handleClose}
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
