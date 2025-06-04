import { serverRedirect, serverRevalidatePath } from '@/lib/action'
import { ResponsePayload } from '@/lib/http'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useLoading } from './use-loading'

export const useRequest = <T extends any[]>(
  cb: (...args: T) => Promise<ResponsePayload | null>,
  redirectUrl?: string,
) => {
  const { startLoading, finallyLoading } = useLoading()
  const router = useRouter()
  const handleRequest = async (...args: T) => {
    startLoading()
    try {
      const res = await cb(...args)
      if (res) toast.success(res.message)
      if (redirectUrl) {
        await serverRevalidatePath(redirectUrl)
        await serverRedirect(redirectUrl)
      }
      return res
    } catch (error: any) {
      if (error instanceof Error) toast.error(error.message)
    } finally {
      if (!redirectUrl) router.refresh()
      finallyLoading()
    }
  }
  return handleRequest
}
