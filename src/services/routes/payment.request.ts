import { getOptionWithAccessToken } from '@/lib/action'
import { CONTROLLER_PREFIX } from '../constants'
import { CurdRequest } from '../crud/crud.request'
import { FeeStatistics } from '../types/fee.dto'
import { GenericCrudPayment } from '../types/payment.dto'

// { path: '/payments', method: 'post' },
// { path: '/payments/:id', method: 'patch' },
// { path: '/payments/:id', method: 'get' },
// { path: '/payments/:id', method: 'delete' },
// { path: '/payments', method: 'get' },
// { path: '/payments', method: 'delete' },
// { path: '/payments/statistics', method: 'get' },

class PaymentRequest extends CurdRequest<GenericCrudPayment> {
  constructor() {
    super(CONTROLLER_PREFIX.PAYMENT)
  }
  async getStatistics() {
    const options = await getOptionWithAccessToken()
    return this.http.get<FeeStatistics>(`${this.prefix}/statistics`, options)
  }
}
export const paymentRequest = new PaymentRequest()
