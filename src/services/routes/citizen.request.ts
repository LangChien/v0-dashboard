import { CONTROLLER_PREFIX } from '../constants'
import { CurdRequest } from '../crud/crud.request'
import { GenericCrudCitizen } from '../types/citizen.dto'

// { path: '/citizens', method: 'post' },
// { path: '/citizens/:id', method: 'patch' },
// { path: '/citizens/:id', method: 'delete' },
// { path: '/citizens', method: 'delete' },
// { path: '/citizens/:id', method: 'get' },
// { path: '/citizens', method: 'get' },

class CitizenRequest extends CurdRequest<GenericCrudCitizen> {
  constructor() {
    super(CONTROLLER_PREFIX.CITIZEN)
  }
}
export const citizenRequest = new CitizenRequest()
