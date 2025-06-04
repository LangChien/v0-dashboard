import { CONTROLLER_PREFIX } from '../constants'
import { CurdRequest } from '../crud/crud.request'
import { GenericCrudHousehold } from '../types/household.dto'

// { path: '/households', method: 'post' },
// { path: '/households/:id', method: 'patch' },
// { path: '/households/:id', method: 'delete' },
// { path: '/households', method: 'delete' },
// { path: '/households/:id', method: 'get' },
// { path: '/households', method: 'get' },

class HouseholdRequest extends CurdRequest<GenericCrudHousehold> {
  constructor() {
    super(CONTROLLER_PREFIX.HOUSEHOLD)
  }
}

export const householdRequest = new HouseholdRequest()
