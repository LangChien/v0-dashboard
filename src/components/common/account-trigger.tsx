'use client'

import { useUser } from '@/hooks/use-account'
import { protectedRequest } from '@/services/routes/protected.request'
import { useEffect } from 'react'

export const UserTrigger = () => {
  const { setUser, user } = useUser()
  useEffect(() => {
    const trigger = async () => {
      if (user) return
      try {
        const res = await protectedRequest.getProfile(true)
        setUser(res.data)
      } finally {
      }
    }
    trigger()
  }, [setUser, user])
  return null
}
