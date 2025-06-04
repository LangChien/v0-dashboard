'use client'

import { serverRedirect, serverRevalidatePath } from '@/lib/action'
import { ResponsePayload, UnprocessableEntityException } from '@/lib/http'
import { UseFormSetError } from 'react-hook-form'
import { toast } from 'sonner'
import { ZodError } from 'zod'
import { useLoading } from './use-loading'

export const useFormSubmit = <T extends any[], R extends ResponsePayload>(
  cb: (...args: T) => Promise<R>,
  setError: UseFormSetError<any>,
  redirectUrl?: string,
) => {
  const { startLoading, finallyLoading } = useLoading()
  const handleRequest = async (...args: T) => {
    startLoading()
    try {
      const res = await cb(...args)
      toast.success(res.message)
      if (redirectUrl) {
        await serverRevalidatePath(redirectUrl)
        await serverRedirect(redirectUrl)
      }
      return res
    } catch (error: any) {
      if (error instanceof UnprocessableEntityException) {
        error.constraints.forEach((constraint) => {
          if (constraint.path.length > 0)
            setError(constraint.path[0], {
              type: 'manual',
              message: constraint.message,
            })
        })
      }
      if (error instanceof ZodError) toast.error(error.errors[0].message)
      if (error instanceof Error) toast.error(error.message)
      else toast.error('Có lỗi xảy ra')
    } finally {
      finallyLoading()
    }
  }
  return handleRequest
}
