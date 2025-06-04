import { clsx, type ClassValue } from 'clsx'
import { formatDate as formatDateDefault } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const getFirstLetterUppercase = (name: string): string => {
  if (!name) return ''
  const strs = name.split(' ')
  if (strs.length < 2) return (strs[0].charAt(0) + strs[0].charAt(1)).toUpperCase()
  return strs.map((str) => str.trim().charAt(0).toUpperCase()).join('')
}

export const isUUID = (id: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)

export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Tháng bắt đầu từ 0
  const year = date.getFullYear()

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}
// table helper
export const getIndexSelectedRow = (rowSelection: Object) => {
  return Object.keys(rowSelection).map(Number)
}

export const getSelectedRow = <T>(rowSelection: Object, data: T[]) => {
  const indexs = getIndexSelectedRow(rowSelection)
  return indexs.map((index) => data[index])
}

export const formatDateTimestamp = (date: string | number | Date) =>
  formatDateDefault(date, 'dd/MM/yyyy HH:mm:ss')

export const formatDateString = (date: string | number | Date) =>
  formatDateDefault(date, 'dd/MM/yyyy')

export const formatMonthYear = (date: Date) => {
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `tháng ${month} năm ${year}`
}

export const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const formatDateShort = (date: Date | string) => {
  return new Date(date).toLocaleDateString('vi-VN')
}
