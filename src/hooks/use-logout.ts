import { authRequest } from '@/services/routes/auth.request'
import { useRouter } from 'next/navigation'
import { useUser } from './use-account'
import { useLoading } from './use-loading'

export const useLogout = (redirectUrl?: string) => {
  const { startLoading, finallyLoading } = useLoading()
  const { removeUser } = useUser()
  const router = useRouter()
  const handleLogout = async () => {
    try {
      startLoading()
      await authRequest.logout()
    } finally {
      removeUser()
      finallyLoading()
      router.push(redirectUrl ?? '/login')
    }
  }
  return handleLogout
}
