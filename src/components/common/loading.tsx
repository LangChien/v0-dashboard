'use client'
import { useLoading } from '@/hooks/use-loading'
import { FC } from 'react'
import { Triangle } from 'react-loader-spinner'
import { Dialog, DialogOverlay } from '../ui/dialog'

export const GlobalLoading: FC<{
  allwayOpen?: boolean
}> = ({ allwayOpen }) => {
  const { isLoading } = useLoading()
  if (!isLoading && !allwayOpen) return null
  return (
    <Dialog defaultOpen>
      <DialogOverlay className='z-[100]'>
        <div className='w-screen h-screen flex flex-col justify-center items-center'>
          <h4 className='text-white flex items-start gap-2'>
            <Triangle
              visible={true}
              height='200'
              width='200'
              color='#4fa94d'
              ariaLabel='triangle-loading'
              wrapperStyle={{}}
              wrapperClass=''
            />
          </h4>
          <h4 className='text-white'>Đang tải, vui lòng chờ trong giây lát</h4>
        </div>
      </DialogOverlay>
    </Dialog>
  )
}
