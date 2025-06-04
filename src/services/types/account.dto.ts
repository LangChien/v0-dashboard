import { z } from 'zod'
import { GenericCrud } from '../crud/crud.generic'
import { ChangeRoleSchema } from '../schemas/account.schema'
import { CreateUserDto, PaginateUser, UpdateUserDto, User } from './user.dto'

export interface ChangeRole extends z.infer<typeof ChangeRoleSchema> {}

export interface GenericCrudUser extends GenericCrud {
  entity: User
  createBodyDto: CreateUserDto
  updateBodyDto: UpdateUserDto
  findManyResponse: PaginateUser
  findOneByIdResponse: User
}
