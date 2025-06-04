'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const serverRevalidateTag = async (tag: string | string[]) => {
  if (Array.isArray(tag)) for (const t of tag) revalidatePath(t)
  else revalidateTag(tag)
}

export const serverRevalidatePath = async (path: string | string[]) => {
  if (Array.isArray(path)) for (const p of path) revalidatePath(p)
  else revalidatePath(path)
}

export const serverRedirect = async (path: string) => {
  redirect(path)
}

export const serverRevalidatePathAndRedirect = async (path: string, query?: string) => {
  revalidatePath(path)
  redirect(`${path}${query ? `?${query}` : ''}`)
}

// phục vụ sử dụng gọi cookies bằng server action
// set delay để đảm bảo cookie được set hoặc delete trước khi trả về response

interface ICookieOption {
  httpOnly?: boolean
  secure?: boolean
  domain?: string
  expires?: number | Date
  maxAge?: number
  sameSite?: boolean | 'lax' | 'strict' | 'none'
  path?: string
  priority?: 'low' | 'medium' | 'high'
}

interface ISetCookieOption extends ICookieOption {
  name: string
  value: string
}

export const serverGetCookie = async (key: string) => {
  return cookies().get(key)?.value
}
export const serverSetCookie = async (option: ISetCookieOption) => {
  cookies().set({ httpOnly: true, secure: true, ...option })
}
export const serverSetCookie2 = async (key: string, value: string) => {
  cookies().set(key, value)
}
export const serverDeleteCookie = async (key: string) => {
  cookies().delete(key)
}
export const serverHasCookie = async (key: string) => {
  return cookies().has(key)
}
