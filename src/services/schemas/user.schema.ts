import { z } from 'zod'
import {
  baseQuerySchema,
  createPaginateResponseSchema,
  dateTimeFilterSchema,
  getEnumFilterSchema,
} from './shared-query-schema'
import { BaseSoftDeleteEntitySchema, createStringSchema } from './shared-schema'

export const USER_ROLE = {
  SYSTEM_ADMIN: 'SYSTEM_ADMIN',
  TEAM_LEADER: 'TEAM_LEADER',
  ACCOUNTANT: 'ACCOUNTANT',
  NORMAL_USER: 'NORMAL_USER',
} as const

export type USER_ROLE = (typeof USER_ROLE)[keyof typeof USER_ROLE]

export const USER_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  BLOCKED: 'BLOCKED',
} as const

export type USER_STATUS = (typeof USER_STATUS)[keyof typeof USER_STATUS]

const EmailSchema = z
  .string({ required_error: 'Email không được để trống' })
  .email({ message: 'Email không hợp lệ' })
  .toLowerCase()
  .trim()

const PasswordSchema = z
  .string({
    required_error: 'Mật khẩu không được để trống',
  })
  .refine(
    (val) => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
      return regex.test(val)
    },
    {
      message:
        'Mật khẩu phải có ít nhất 8 ký tự, bao gồm tối thiểu 1 ký tự đặc biệt, tối thiểu 1 số, 1 chữ viết hoa và 1 chữ viết thường',
    },
  )

const RoleSchema = z.nativeEnum(USER_ROLE, {
  required_error: 'Trạng thái là bắt buộc',
  invalid_type_error: 'Trạng thái không hợp lệ',
})

const StatusSchema = z.nativeEnum(USER_STATUS, {
  required_error: 'Vai trò là bắt buộc',
  invalid_type_error: 'Vai trò không hợp lệ',
})

export const UserSchema = BaseSoftDeleteEntitySchema.extend({
  email: EmailSchema,
  firstName: createStringSchema('Tên'),
  lastName: createStringSchema('Họ'),
  fullName: z.string(),
  password: PasswordSchema,
  role: RoleSchema,
  status: StatusSchema,
  avatar: z.string().nullable(),
  lastLogin: z.coerce.date().nullable(),
})

export const UserSchemaWithoutPassword = UserSchema.omit({
  password: true,
  deletedAt: true,
})

export const CreateUserSchema = UserSchema.pick({
  email: true,
  firstName: true,
  lastName: true,
  password: true,
  role: true,
  status: true,
  avatar: true,
}).partial({
  role: true,
  status: true,
  avatar: true,
})

export const UpdateUserSchema = UserSchema.partial()

export const RefreshTokenSchema = z.object({
  tokenId: z.string(),
  userId: z.string(),
  expiredAt: z.date(),
  createdAt: z.date(),
  ip: z.string(),
  userAgent: z.string(),
})

export const UserIncludeRefreshTokenSchema = UserSchema.omit({
  password: true,
  deletedAt: true,
}).extend({
  refreshTokens: z.array(RefreshTokenSchema),
})

export const UserQuerySchema = baseQuerySchema.extend({
  filter: z
    .object({
      createdAt: dateTimeFilterSchema.optional(),
      updatedAt: dateTimeFilterSchema.optional(),
      lastLogin: dateTimeFilterSchema.optional(),
      deletedAt: dateTimeFilterSchema.optional(),
      status: getEnumFilterSchema(USER_STATUS).optional(),
      role: getEnumFilterSchema(USER_ROLE).optional(),
    })
    .optional()
    .default({}),
})

export const PaginateUserSchema = createPaginateResponseSchema(UserSchema)
