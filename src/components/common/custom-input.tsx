import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

import { Eye, EyeOff } from 'lucide-react'
import { ComponentProps, forwardRef, useState } from 'react'
import { Input } from '../ui/input'

const CustomInput = forwardRef<
  HTMLInputElement,
  ComponentProps<'input'> & {
    labelButton: string
    disabledButton?: boolean
    onClickButton?: () => void
  }
>(({ className, type, labelButton, disabled, disabledButton, onClickButton, ...props }, ref) => {
  return (
    <div className={cn('relative', className)}>
      <Input disabled={disabled} type={type} className='h-10 pr-14' ref={ref} {...props} />
      <Button
        disabled={disabledButton ?? disabled}
        type='button'
        onClick={onClickButton}
        size='sm'
        className='rounded-2xl absolute right-1 top-1/2 -translate-y-1/2'
        variant='destructive'
      >
        {labelButton}
      </Button>
    </div>
  )
})
CustomInput.displayName = 'CustomInputInput'

export { CustomInput }

const PasswordInput = forwardRef<HTMLInputElement, ComponentProps<'input'>>(
  ({ className, disabled, ...props }, ref) => {
    const [type, setType] = useState<'password' | 'text'>('password')
    const onClickButton = () => {
      setType((prev) => (prev === 'password' ? 'text' : 'password'))
    }
    return (
      <div className={cn('relative', className)}>
        <Input disabled={disabled} type={type} className='h-10 pr-14' ref={ref} {...props} />
        <Button
          type='button'
          onClick={onClickButton}
          size='sm'
          className='rounded-2xl absolute right-1 top-1/2 -translate-y-1/2'
          variant='ghost'
        >
          {type === 'password' ? <EyeOff /> : <Eye />}
        </Button>
      </div>
    )
  },
)
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
