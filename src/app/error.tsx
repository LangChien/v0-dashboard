'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useLogout } from '@/hooks/use-logout'
import { Home, LogIn, RefreshCcw } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function PageError() {
  const handleLogout = useLogout()
  const router = useRouter()
  const pathName = usePathname()

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4'>
      {/* Background pattern */}
      <div className='absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[size:20px_20px]'></div>

      {/* Decorative elements */}
      <div className='absolute top-0 right-0 w-1/3 h-1/3 bg-red-500/10 rounded-full blur-3xl'></div>
      <div className='absolute bottom-0 left-0 w-1/3 h-1/3 bg-orange-500/10 rounded-full blur-3xl'></div>

      <Card
        className='relative z-10 bg-white/10 backdrop-blur-md border-white/20 p-8 max-w-6xl
      py-20 w-full'
      >
        <div className='flex flex-col lg:flex-row items-center justify-center gap-8'>
          {/* Error Image */}
          <div className='flex-shrink-0'>
            <Image
              className='object-cover rounded-xl'
              width={400}
              height={400}
              alt='server-error'
              src='/500.png'
            />
          </div>

          {/* Error Content */}
          <div className='space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left'>
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

            <div className='space-y-4'>
              <h1 className='font-bold text-3xl md:text-4xl text-white'>
                Xin lỗi, đã có lỗi xảy ra
              </h1>
              <div className='space-y-2'>
                <p className='text-gray-300 font-medium'>
                  Hệ thống của chúng tôi hiện đang được bảo trì hoặc đã xảy ra lỗi chưa được giải
                  quyết.
                </p>
                <p className='text-gray-300 font-medium'>
                  Vui lòng thử lại sau hoặc liên hệ với chúng tôi.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 pt-4'>
              <Button
                onClick={() => router.replace(`${pathName}?refresh=${Date.now()}`)}
                size='lg'
                className='bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2'
              >
                <RefreshCcw className='w-4 h-4' />
                Làm mới trang
              </Button>

              <Button
                asChild
                variant='outline'
                size='lg'
                className='border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white'
              >
                <Link href='/' className='flex items-center gap-2'>
                  <Home className='w-4 h-4' />
                  Về trang chủ
                </Link>
              </Button>

              <Button
                onClick={handleLogout}
                variant='secondary'
                size='lg'
                className='bg-white/10 text-white hover:bg-white/20 flex items-center gap-2'
              >
                <LogIn className='w-4 h-4' />
                Đăng nhập lại
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
