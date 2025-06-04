import { http } from '@/lib/http'
import { AccessTokenPayload, decodeJwtToken } from '@/lib/jwt'
import { TokenResponse } from '@/services/types/auth.dto'
import { serverGetCookie, serverSetCookie } from './action.func'

export const setCookieWithToken = async (name: string, token: string) => {
  const decode = decodeJwtToken(token)
  await serverSetCookie({
    name,
    value: token,
    expires: new Date(decode.exp * 1000),
  })
}

export const updateRefreshToken = async (param: TokenResponse) => {
  const { accessToken, refreshToken } = param
  await setCookieWithToken('accessToken', accessToken)
  await setCookieWithToken('refreshToken', refreshToken)
}

// todo: check if token is expired
export const getAccessTokenInClient = async () => {
  const accessToken = await serverGetCookie('accessToken')
  if (accessToken) return accessToken
  const refreshToken = await serverGetCookie('refreshToken')
  const res = await http.post<TokenResponse>('/auth/refresh-token', { refreshToken })
  await updateRefreshToken(res.data)
  return res.data.accessToken
}

export const getOptionWithAccessToken = async (isClien?: boolean) => {
  if (isClien) {
    const accessToken = await getAccessTokenInClient()
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  }
  const accessToken = await serverGetCookie('accessToken')
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
}

export const getAccessTokenPayload = async () => {
  const accessToken = await serverGetCookie('accessToken')
  if (!accessToken) return null
  return decodeJwtToken(accessToken) as AccessTokenPayload
}
