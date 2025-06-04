import { getOptionWithAccessToken } from '@/lib/action'
import { CONTROLLER_PREFIX } from '../constants'
import { CurdRequest } from '../crud/crud.request'
import { ChangeRole, GenericCrudUser } from '../types/account.dto'
import { User } from '../types/user.dto'

// readonly api
// const accountApi = [
// { path: '/accounts', method: 'post' },
// { path: '/accounts/:id', method: 'patch' },
// { path: '/accounts/:id', method: 'delete' },
// { path: '/accounts', method: 'delete' },
// { path: '/accounts/:id', method: 'get' },
// { path: '/accounts', method: 'get' },
// { path: '/accounts/:id/role', method: 'patch' },
// { path: '/accounts/:id/restore', method: 'patch' },
// ]

class UserRequest extends CurdRequest<GenericCrudUser> {
  constructor() {
    super(CONTROLLER_PREFIX.ACCOUNT)
  }
  async changeRole(id: string, body: ChangeRole) {
    const httpOptions = await getOptionWithAccessToken(true)
    return this.http.patch(`${this.prefix}/${id}/role`, body, httpOptions)
  }

  async restore(id: string) {
    const httpOptions = await getOptionWithAccessToken(true)
    return this.http.patch<User>(`${this.prefix}/${id}/restore`, {}, httpOptions)
  }
}

export const accountRequest = new UserRequest()
