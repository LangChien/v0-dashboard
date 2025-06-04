'use client'
import { useUser } from '@/hooks/use-account'
import { USER_ROLE } from '@/services/schemas/user.schema'
import { ReactNode } from 'react'

export const AccessForRole = ({ children, roles }: { roles: USER_ROLE[]; children: ReactNode }) => {
  const user = useUser((state) => state.user)
  if (!user) return null
  if (roles.includes(user.role)) return children
  return null
}
