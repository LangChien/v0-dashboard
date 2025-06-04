'use client'
import { Button } from '@/components/ui/button'
import { useLogout } from '@/hooks/use-logout'

export const ButtonLogout = () => {
  const handleLogout = useLogout()
  return (
    <Button onClick={handleLogout} size='lg'>
      Đăng nhập lại
    </Button>
  )
}
