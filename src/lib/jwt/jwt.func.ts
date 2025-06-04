import { jwtDecode } from 'jwt-decode'
import { AccessTokenPayload, RefreshTokenPayload } from './jwt.type'

export const decodeJwtToken = (token: string): AccessTokenPayload => {
  try {
    return jwtDecode(token)
  } catch {
    throw new Error('Token không hợp lệ')
  }
}

export const decodeRefreshToken = (token: string): RefreshTokenPayload => {
  try {
    return jwtDecode(token)
  } catch {
    throw new Error('Token không hợp lệ')
  }
}
