import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Home } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Không tìm thấy trang - 404',
  description: 'Trang này không tồn tại hoặc đã bị xóa. Chúng tôi đề nghị bạn quay lại trang chủ.',
}

export default function PageNotFound() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4'>
      {/* Background pattern */}
      <div className='absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[size:20px_20px]'></div>

      {/* Decorative elements */}
      <div className='absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/10 rounded-full blur-3xl'></div>
      <div className='absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-500/10 rounded-full blur-3xl'></div>

      <Card className='relative z-10 bg-white/10 backdrop-blur-md border-white/20 p-8 max-w-2xl w-full text-center'>
        <div className='flex flex-col items-center space-y-6'>
          {/* Logo */}
          <div className='flex items-center gap-3 mb-4'>
            <Image
              src='/logo-removebg.png'
              alt='Blue Moon Logo'
              width={60}
              height={60}
              className='object-contain'
            />
            <div>
              <h2 className='text-xl font-bold text-white'>BLUE MOON</h2>
              <p className='text-sm text-blue-200'>Quản lý chung cư</p>
            </div>
          </div>

          {/* 404 Image */}
          <div className='w-[250px] md:w-[300px] lg:w-[350px]'>
            <Image
              className='w-full h-full max-w-full max-h-full'
              width={350}
              height={350}
              alt='404-notfound'
              src='/404.svg'
            />
          </div>

          {/* Error Message */}
          <div className='space-y-4'>
            <h1 className='font-bold text-3xl md:text-4xl text-white'>
              Rất tiếc! Không tìm thấy trang
            </h1>
            <p className='text-gray-300 text-center font-medium max-w-md'>
              Trang này không tồn tại hoặc đã bị xóa. Chúng tôi đề nghị bạn quay lại trang chủ hoặc
              kiểm tra lại đường dẫn.
            </p>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 pt-4'>
            <Button asChild size='lg' className='bg-blue-600 hover:bg-blue-700 text-white'>
              <Link href='/' className='flex items-center gap-2'>
                <Home className='w-4 h-4' />
                Về trang chủ
              </Link>
            </Button>
            <Button
              asChild
              variant='outline'
              size='lg'
              className='border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white'
            >
              <Link href='javascript:history.back()' className='flex items-center gap-2'>
                <ArrowLeft className='w-4 h-4' />
                Quay lại
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
