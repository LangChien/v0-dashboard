import { envConfig } from '@/config/env.config'
import {
  CustomRequestInit,
  ForbiddenException,
  NotFoundException,
  ResponseErrorPayload,
  ResponseSuccessPayload,
  UnauthorizedException,
  UnprocessableEntityException,
} from './http.type'

const request = async <T>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  option?: CustomRequestInit,
) => {
  const body = option?.body ? JSON.stringify(option.body) : undefined
  const baseHeaders = {
    'Content-Type': 'application/json',
  }
  const baseUrl = option?.baseUrl ?? envConfig.NEXT_PUBLIC_API_URL

  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`
  const res = await fetch(fullUrl, {
    ...option,
    method,
    body,
    headers: {
      ...baseHeaders,
      ...option?.headers,
    },
  })
  const payload = await res.json()
  if (res.ok) return payload as ResponseSuccessPayload<T>
  console.error(fullUrl)
  if (res.status === 401) throw new UnauthorizedException(payload)
  if (res.status === 403) throw new ForbiddenException(payload)
  if (res.status === 404) throw new NotFoundException(payload)
  if (res.status === 422) throw new UnprocessableEntityException(payload)
  if (payload?.error && payload?.message && payload?.statusCode)
    throw new ResponseErrorPayload(payload)
  throw new Error('Xảy ra lỗi khi thực hiện yêu cầu HTTP đến server')
}

export type HttpOption = Omit<CustomRequestInit, 'body'>
export const http = {
  get: <T>(url: string, option?: HttpOption) => request<T>('GET', url, option),
  post: <T>(url: string, body: any, option?: HttpOption) =>
    request<T>('POST', url, { ...option, body }),
  put: <T>(url: string, body: any, option?: HttpOption) =>
    request<T>('PUT', url, { ...option, body }),
  patch: <T>(url: string, body: any, option?: HttpOption) =>
    request<T>('PATCH', url, { ...option, body }),
  delete: <T>(url: string, option?: HttpOption) => request<T>('DELETE', url, option),
}
