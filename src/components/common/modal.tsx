'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

interface ModalProps {
  children: ReactNode
  className?: string
  title: string
  description?: string
  parentPath: string
  icon?: ReactNode
}
export const Modal = ({
  children,
  title,
  className,
  description,
  parentPath,
  icon,
}: ModalProps) => {
  const router = useRouter()
  const [isOpen, setOpen] = useState(true)
  const pathName = usePathname()
  useEffect(() => {
    if (pathName === parentPath) setOpen(false)
    else setOpen(true)
  }, [pathName, parentPath])
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) router.back()
        setOpen(open)
      }}
    >
      <DialogContent className={cn('max-h-[500px] overflow-auto', className)}>
        <DialogHeader>
          <DialogTitle>
            <div className='text-2xl font-bold flex items-center gap-2 justify-start'>
              {icon}
              <h1>{title}</h1>
            </div>
          </DialogTitle>
          <DialogDescription>{description ?? ''}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
