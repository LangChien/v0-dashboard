import { CONTROLLER_PREFIX } from '../constants'
import { CurdRequest } from '../crud/crud.request'
import { GenericCrudFee } from '../types/fee.dto'

// { path: '/fees', method: 'post' },
// { path: '/fees/:id', method: 'patch' },
// { path: '/fees/:id', method: 'delete' },
// { path: '/fees', method: 'delete' },
// { path: '/fees/:id', method: 'get' },
// { path: '/fees', method: 'get' },

class FeeRequest extends CurdRequest<GenericCrudFee> {
  constructor() {
    super(CONTROLLER_PREFIX.FEE)
  }
}
export const feeRequest = new FeeRequest()
