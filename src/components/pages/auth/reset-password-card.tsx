import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { ResetPasswordForm } from './reset-password-form'

export const ResetPasswordCard = () => {
  return (
    <Card className='m-2 md:max-w-[800px] w-full flex flex-col md:flex-row items-center justify-center gap-10 p-10'>
      <Image
        width={240}
        height={240}
        alt='moon-blue'
        src='/logo.png'
        className='object-cover rounded-full'
      />
      <div className='flex-1 w-full'>
        <h1 className='text-3xl font-bold mb-4 text-center'>Khôi phục mật khẩu</h1>
        <ResetPasswordForm />
      </div>
    </Card>
  )
}
