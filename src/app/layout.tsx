import { UserTrigger } from '@/components/common/account-trigger'
import { GlobalLoading } from '@/components/common/loading'
import { ThemeProvider } from '@/components/theme/theme-provider'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import type React from 'react'
import { Toaster } from 'sonner'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: {
    default: 'Blue Moon - Hệ thống quản lý chung cư',
    template: '%s | Blue Moon',
  },
  description:
    'Hệ thống quản lý chung cư thông minh Blue Moon - Giải pháp toàn diện cho việc quản lý chung cư hiện đại, giúp cư dân và ban quản lý kết nối, tương tác một cách hiệu quả và tiện lợi.',
  keywords: [
    'quản lý chung cư',
    'Blue Moon',
    'hệ thống quản lý',
    'chung cư thông minh',
    'cư dân',
    'ban quản lý',
    'tiện ích',
    'thanh toán',
  ],
  authors: [{ name: 'Blue Moon Team' }],
  creator: 'Blue Moon',
  publisher: 'Blue Moon',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://blue-moon.langtien.io.vn/',
    title: 'Blue Moon - Hệ thống quản lý chung cư thông minh',
    description:
      'Giải pháp toàn diện cho việc quản lý chung cư hiện đại, giúp cư dân và ban quản lý kết nối hiệu quả.',
    siteName: 'Blue Moon',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blue Moon - Hệ thống quản lý chung cư thông minh',
    description:
      'Giải pháp toàn diện cho việc quản lý chung cư hiện đại, giúp cư dân và ban quản lý kết nối hiệu quả.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='vi' suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <UserTrigger />
        </ThemeProvider>
        <Toaster position='top-center' richColors duration={2000} />
        <GlobalLoading />
      </body>
    </html>
  )
}
