import {
  serverDeleteCookie,
  serverGetCookie,
  setCookieWithToken,
  updateRefreshToken,
} from '@/lib/action'
import { UnauthorizedException } from '@/lib/http'
import { http } from '@/lib/http/http.func'
import { CONTROLLER_PREFIX } from '../constants'
import {
  LoginBodyDto,
  LogoutBodyDto,
  RefreshTokenBodyDto,
  RegisterBodyDto,
  ResetPasswordBodyDto,
  SendOtpEmailBodyDto,
  TokenResponse,
  VerifyOTPBodyDto,
} from '../types/auth.dto'
import { User } from '../types/user.dto'

const AUTH_ENDPOINT = {
  LOGIN: { path: '/auth/login', method: 'post' },
  REGISTER: { path: '/auth/register', method: 'post' },
  REFRESH_TOKEN: { path: '/auth/refresh-token', method: 'post' },
  LOGOUT: { path: '/auth/logout', method: 'post' },
  RESET_PASSWORD: { path: '/auth/reset-password', method: 'post' },
  SEND_OTP_EMAIL: { path: '/auth/otp', method: 'post' },
  VERIFY_OTP_EMAIL: { path: '/auth/verify-otp', method: 'post' },
}
class AuthRequest {
  private prefix = CONTROLLER_PREFIX.AUTH

  private async getProfile(accessToken: string) {
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    const res = await http.get<User>(`protected/profile`, httpOptions)
    return res.data
  }
  async login(body: LoginBodyDto) {
    const res = await http.post<TokenResponse>(
      `${this.prefix}${AUTH_ENDPOINT.LOGIN.path.replace('/auth', '')}`,
      body,
    )
    await updateRefreshToken(res.data)
    const account = await this.getProfile(res.data.accessToken)
    return { ...res, data: { ...res.data, user: account } }
  }

  async register(body: RegisterBodyDto) {
    const otpToken = await serverGetCookie('otpToken')
    const res = await http.post<TokenResponse>(
      `${this.prefix}${AUTH_ENDPOINT.REGISTER.path.replace('/auth', '')}`,
      { ...body, otpToken },
    )
    await updateRefreshToken(res.data)
    const account = await this.getProfile(res.data.accessToken)
    return { ...res, data: { ...res.data, user: account } }
  }

  async refreshToken(body: RefreshTokenBodyDto) {
    const res = await http.post<TokenResponse>(AUTH_ENDPOINT.REFRESH_TOKEN.path, body)
    await updateRefreshToken(res.data)
    const account = await this.getProfile(res.data.accessToken)
    return { ...res, data: { ...res.data, user: account } }
  }

  async logout() {
    const refreshToken = await serverGetCookie('refreshToken')
    if (!refreshToken) throw new UnauthorizedException()
    const body: LogoutBodyDto = {
      refreshToken,
    }
    await serverDeleteCookie('refreshToken')
    await serverDeleteCookie('accessToken')
    return http.post<void>(AUTH_ENDPOINT.LOGOUT.path, body)
  }

  async sendOtpEmail(body: SendOtpEmailBodyDto) {
    const res = await http.post<void>(AUTH_ENDPOINT.SEND_OTP_EMAIL.path, body)
    return res
  }

  async verifyOtpEmail(body: VerifyOTPBodyDto) {
    const res = await http.post<{ otpToken: string }>(AUTH_ENDPOINT.VERIFY_OTP_EMAIL.path, body)
    await setCookieWithToken('otpToken', res.data.otpToken)
    return res
  }

  async resetPassword(body: ResetPasswordBodyDto) {
    const otpToken = await serverGetCookie('otpToken')
    const res = await http.post<TokenResponse>(AUTH_ENDPOINT.RESET_PASSWORD.path, {
      ...body,
      otpToken,
    })
    await updateRefreshToken(res.data)
    await serverDeleteCookie('otpToken')
    const account = await this.getProfile(res.data.accessToken)
    return { ...res, data: { ...res.data, user: account } }
  }
}

export const authRequest = new AuthRequest()
