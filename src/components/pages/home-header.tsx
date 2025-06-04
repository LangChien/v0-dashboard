'use client'

import { useUser } from '@/hooks/use-account'
import Link from 'next/link'
import { Fragment } from 'react'
import { Button } from '../ui/button'

export const HomeHeader = () => {
  const { user } = useUser()
  if (!user)
    return (
      <Fragment>
        <Link passHref href='/login'>
          <Button
            variant='outline'
            className='border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white'
          >
            Đăng nhập
          </Button>
        </Link>
        <Link passHref href='/register'>
          <Button className='border-blue-400 bg-blue-400 hover:bg-blue-400 text-white'>
            Đăng ký
          </Button>
        </Link>
      </Fragment>
    )
  return (
    <Fragment>
      <Link passHref href='/dashboard'>
        <Button className='border-blue-400 bg-blue-400 hover:bg-blue-400 text-white'>
          Trang quản lý
        </Button>
      </Link>
      <Link passHref href='/dashboard/protected/profile'>
        <Button
          variant='outline'
          className='border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white'
        >
          Hồ sơ
        </Button>
      </Link>
    </Fragment>
  )
}
