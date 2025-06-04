import { USER_ROLE, USER_STATUS } from '@/services/schemas/user.schema'

export interface TokenPayload {
  iat: number
  exp: number
}

export interface AccessTokenPayload extends TokenPayload {
  userId: string
  role: USER_ROLE
  email: string
  status: USER_STATUS
  deletedAt: Date | null
}

export interface RefreshTokenPayload extends TokenPayload {
  userId: string
  jti: string
}
