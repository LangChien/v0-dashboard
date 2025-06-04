import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ForbiddenException, NotFoundException, UnauthorizedException } from '@/lib/http'
import { AlertTriangle, Home } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

export const HandleException = ({ error }: { error: any }) => {
  if (error instanceof NotFoundException) notFound()
  if (error instanceof ForbiddenException) redirect('/dashboard/permission-denied')
  if (error instanceof UnauthorizedException) redirect('/login')

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4'>
      {/* Background pattern */}
      <div className='absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[size:20px_20px]'></div>

      <Card className='relative z-10 bg-white/10 backdrop-blur-md border-white/20 p-8 max-w-md w-full text-center'>
        <div className='flex flex-col items-center space-y-6'>
          {/* Logo */}
          <div className='flex items-center gap-3'>
            <Image
              src='/logo-removebg.png'
              alt='Blue Moon Logo'
              width={50}
              height={50}
              className='object-contain'
            />
            <div>
              <h2 className='text-lg font-bold text-white'>BLUE MOON</h2>
              <p className='text-sm text-blue-200'>Quản lý chung cư</p>
            </div>
          </div>

          {/* Error Icon */}
          <div className='w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center'>
            <AlertTriangle className='w-8 h-8 text-red-400' />
          </div>

          {/* Error Message */}
          <div className='space-y-2'>
            <h1 className='text-2xl font-bold text-white'>Lỗi không xác định</h1>
            <p className='text-gray-300'>Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.</p>
          </div>

          {/* Action Button */}
          <Button asChild size='lg' className='bg-blue-600 hover:bg-blue-700 text-white'>
            <Link href='/' className='flex items-center gap-2'>
              <Home className='w-4 h-4' />
              Về trang chủ
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
