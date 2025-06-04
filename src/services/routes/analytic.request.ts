import { http } from '@/lib/http'
import { GENDER } from '../schemas/citizen.schema'

export interface CountData {
  household: number
  fee: number
  citizen: number
  payment: number
}

export interface CountPaymentByDate {
  date: string
  amount: number
  count: number
}

export interface CountPayment {
  currentMonth: number
  prevMonth: number
  total: number
}

export const analyticRequest = {
  getCountData: async () => {
    return http.get<CountData>('/analytics/count')
  },

  getCountByGender: async () => {
    return http.get<Record<GENDER, number>>('/analytics/count-gender')
  },

  getCountPaymentByDate: async (timeRange: string) => {
    return http.get<CountPaymentByDate[]>(
      `/analytics/count-fee-payment-by-date?timeRange=${timeRange}`,
      {
        cache: 'no-cache',
      },
    )
  },

  getCountFee: async () => {
    return http.get<CountPayment>('/analytics/count-fee-payment')
  },
}
