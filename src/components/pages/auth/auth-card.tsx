import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { type FC, type ReactNode, Suspense } from 'react'

export const AuthCard: FC<{
  AuthForm: ReactNode
  suspense?: boolean
  title: string
  Footer: ReactNode
  scrollArea?: boolean
}> = ({ AuthForm, suspense, title, Footer, scrollArea }) => {
  return (
    <div className='w-full max-w-5xl mx-auto'>
      {/* Back to home button */}
      <div className='mb-6 w-full'>
        <Button asChild variant='ghost' className='text-white hover:text-blue-300 hover:bg-white/5'>
          <Link href='/' className='flex items-center gap-2'>
            <ArrowLeft className='w-4 h-4' />
            <span>Về trang chủ</span>
          </Link>
        </Button>
      </div>

      <Card className='bg-white/5 backdrop-blur-md border border-white/10 shadow-xl overflow-hidden'>
        <div className='flex flex-col lg:flex-row'>
          {/* Left side - Branding */}
          <div className='lg:w-1/2 bg-gradient-to-br from-blue-900/80 to-slate-900/80 p-8 flex flex-col items-center justify-center relative overflow-hidden'>
            {/* Decorative circles */}
            <div className='absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl'></div>
            <div className='absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl'></div>

            {/* Logo and branding */}
            <div className='relative z-10 text-center'>
              <Image
                width={180}
                height={180}
                alt='Blue Moon Logo'
                src='/logo-removebg.png'
                className='object-contain mx-auto mb-6'
              />
              <h2 className='text-3xl font-bold text-white mb-2'>BLUE MOON</h2>
              <p className='text-blue-200 mb-6'>Quản lý chung cư thông minh</p>

              <div className='space-y-4 mt-8 max-w-sm'>
                <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10'>
                  <p className='text-white text-sm'>
                    &quot;Hệ thống quản lý chung cư hiện đại, giúp cư dân và ban quản lý kết nối
                    hiệu quả&quot;
                  </p>
                </div>
                <div className='flex justify-center space-x-3'>
                  <div className='w-2 h-2 rounded-full bg-blue-400'></div>
                  <div className='w-2 h-2 rounded-full bg-white/30'></div>
                  <div className='w-2 h-2 rounded-full bg-white/30'></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className='lg:w-1/2 p-8'>
            <div className='max-w-md mx-auto'>
              <h1 className='text-2xl font-bold mb-6 text-white'>{title}</h1>

              <ScrollArea className={cn('pr-3', scrollArea && 'h-[450px]')}>
                <div className='space-y-6'>
                  {suspense ? (
                    <Suspense
                      fallback={
                        <div className='flex justify-center py-8'>
                          <div className='text-white'>Đang tải...</div>
                        </div>
                      }
                    >
                      {AuthForm}
                    </Suspense>
                  ) : (
                    AuthForm
                  )}
                  {Footer}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
