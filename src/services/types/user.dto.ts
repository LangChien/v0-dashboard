import z from 'zod'
import {
  CreateUserSchema,
  PaginateUserSchema,
  RefreshTokenSchema,
  UpdateUserSchema,
  UserIncludeRefreshTokenSchema,
  UserQuerySchema,
  UserSchemaWithoutPassword,
} from '../schemas/user.schema'

export interface CreateUserDto extends z.infer<typeof CreateUserSchema> {}
export interface PaginateUser extends z.infer<typeof PaginateUserSchema> {}
export interface RefreshToken extends z.infer<typeof RefreshTokenSchema> {}
export interface UpdateUserDto extends z.infer<typeof UpdateUserSchema> {}
export interface UserIncludeRefreshToken extends z.infer<typeof UserIncludeRefreshTokenSchema> {}
export interface UserQuery extends z.infer<typeof UserQuerySchema> {}
export interface User extends z.infer<typeof UserSchemaWithoutPassword> {}
