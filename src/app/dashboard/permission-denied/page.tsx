import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Home, User } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ButtonLogout } from './buttons'

export const metadata: Metadata = {
  title: 'Không có quyền truy cập - 403',
  description:
    'Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên để được cấp quyền.',
}

export default function PermissionDeniedPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4'>
      {/* Background pattern */}
      <div className='absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[size:20px_20px]'></div>

      {/* Decorative elements */}
      <div className='absolute top-0 right-0 w-1/3 h-1/3 bg-red-500/10 rounded-full blur-3xl'></div>
      <div className='absolute bottom-0 left-0 w-1/3 h-1/3 bg-yellow-500/10 rounded-full blur-3xl'></div>

      <Card className='relative z-10 bg-white/10 backdrop-blur-md border-white/20 p-8 max-w-5xl w-full py-10'>
        <div className='flex flex-col lg:flex-row items-center justify-center gap-8'>
          {/* 403 Image */}
          <div className='flex-shrink-0'>
            <Image
              alt='403 Forbidden'
              src='/403.png'
              width={400}
              height={400}
              className='object-cover rounded-xl'
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
              <h1 className='text-3xl md:text-4xl font-bold text-red-400'>
                Không có quyền truy cập
              </h1>
              <div className='space-y-2'>
                <p className='text-gray-300 font-medium'>
                  Bạn không có quyền truy cập vào trang này hoặc tính năng này.
                </p>
                <p className='text-gray-300 font-medium'>
                  Vui lòng liên hệ quản trị viên để được cấp quyền truy cập hoặc kiểm tra lại thông
                  tin đăng nhập.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 pt-4'>
              <Button
                asChild
                size='lg'
                className='bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2'
              >
                <Link href='/dashboard'>
                  <Home className='w-4 h-4' />
                  Về dashboard
                </Link>
              </Button>

              <Button
                asChild
                variant='outline'
                size='lg'
                className='border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white'
              >
                <Link href='/dashboard/protected/profile' className='flex items-center gap-2'>
                  <User className='w-4 h-4' />
                  Trang cá nhân
                </Link>
              </Button>

              <ButtonLogout />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
