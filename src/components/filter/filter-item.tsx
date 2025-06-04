import { Separator } from '@/components/ui/separator'
import { FC, ReactNode } from 'react'

export const FilterItem: FC<{
  title: string
  children?: ReactNode
}> = ({ title, children }) => {
  return (
    <div>
      <p className='mb-3 font-semibold'>{title}</p>
      {children}
      <Separator className='my-4' />
    </div>
  )
}
