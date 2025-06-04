import { Button } from '@/components/ui/button'
import { Download, LucideIcon } from 'lucide-react'
import React, { FC } from 'react'

export const PageHeader: FC<{
  title: string
  icon?: LucideIcon
  download?: boolean
}> = ({ title, icon, download }) => {
  return (
    <div className='flex items-center justify-between border-b-2 pb-3 mb-3'>
      <div className='flex items-center gap-3'>
        {icon && React.createElement(icon)}
        <h1 className='text-2xl font-bold capitalize'>{title}</h1>
      </div>
      {download && (
        <Button variant='outline'>
          <Download />
          <p>Tải xuống</p>
        </Button>
      )}
    </div>
  )
}
