import { getOptionWithAccessToken, serverDeleteCookie, serverGetCookie } from '@/lib/action'
import { http, UnauthorizedException } from '@/lib/http'
import { decodeRefreshToken } from '@/lib/jwt'
import { CONTROLLER_PREFIX } from '../constants'
import { ChangePasswordBodyDto, UpdateProfileDto } from '../types/protected.dto'
import { User, UserIncludeRefreshToken } from '../types/user.dto'

const PROTECTED_ENDPOINT = {
  GET_PROFILE: { path: '/protected/profile', method: 'get' },
  UPDATE_PROFILE: { path: '/protected/profile', method: 'post' },
  CHANGE_PASSWORD: { path: '/protected/password', method: 'post' },
  SOFT_DELETE: { path: '/protected/soft-delete', method: 'delete' },
  REVOKE_REFRESH_TOKEN: { path: '/protected/refresh-tokens/:tokenId', method: 'delete' },
  LOGOUT_ALL_DEVICES: { path: '/protected/logout-all-devices', method: 'post' },
}

class ProtectedRequest {
  private prefix = CONTROLLER_PREFIX.PROTECTED

  async changePassword(body: ChangePasswordBodyDto) {
    const httpOptions = await getOptionWithAccessToken(true)
    return http.post<User>(
      `${this.prefix}${PROTECTED_ENDPOINT.CHANGE_PASSWORD.path.replace('/protected', '')}`,
      body,
      httpOptions,
    )
  }

  async updateProfile(body: UpdateProfileDto) {
    const httpOptions = await getOptionWithAccessToken(true)
    return http.post<User>(
      `${this.prefix}${PROTECTED_ENDPOINT.UPDATE_PROFILE.path.replace('/protected', '')}`,
      body,
      httpOptions,
    )
  }

  async getProfile(isClient?: boolean) {
    const httpOptions = await getOptionWithAccessToken(isClient)
    return http.get<UserIncludeRefreshToken>(
      `${this.prefix}${PROTECTED_ENDPOINT.GET_PROFILE.path.replace('/protected', '')}`,
      httpOptions,
    )
  }

  async revokeRefreshToken(tokenId: string) {
    const refreshToken = await serverGetCookie('refreshToken')
    if (!refreshToken) throw new UnauthorizedException()
    const decodedToken = decodeRefreshToken(refreshToken)
    if (decodedToken.jti === tokenId)
      throw new Error('Không thể tự thu hồi token trên thiết bị hiện tại')
    const httpOptions = await getOptionWithAccessToken(true)
    return http.delete(
      `${this.prefix}${PROTECTED_ENDPOINT.REVOKE_REFRESH_TOKEN.path.replace(':tokenId', tokenId).replace('/protected', '')}`,
      httpOptions,
    )
  }

  async softDelete() {
    const httpOptions = await getOptionWithAccessToken(true)
    return http.delete(
      `${this.prefix}${PROTECTED_ENDPOINT.SOFT_DELETE.path.replace('/protected', '')}`,
      httpOptions,
    )
  }

  async logoutAllDevices() {
    const httpOptions = await getOptionWithAccessToken(false)
    await serverDeleteCookie('refreshToken')
    await serverDeleteCookie('accessToken')
    return http.post(
      `${this.prefix}${PROTECTED_ENDPOINT.LOGOUT_ALL_DEVICES.path.replace('/protected', '')}`,
      {},
      httpOptions,
    )
  }
}

export const protectedRequest = new ProtectedRequest()
