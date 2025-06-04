import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useRef } from 'react'

export const useQueryManager = () => {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const paramsRef = useRef(new URLSearchParams(searchParams))

  const updateParam = (key: string, value?: any) => {
    const page = paramsRef.current.get('page')
    if (page) paramsRef.current.delete('page')
    if (value === undefined) paramsRef.current.delete(key)
    else paramsRef.current.set(key, value)
    const newUrl = `${pathname}?${paramsRef.current.toString()}`
    replace(newUrl)
  }

  return {
    updateParam,
    searchParams,
  }
}

export interface QueryManager extends ReturnType<typeof useQueryManager> {}
