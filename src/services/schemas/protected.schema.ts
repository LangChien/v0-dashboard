import { z } from 'zod'
import { UserSchema } from './user.schema'

export const UpdateProfileSchema = UserSchema.pick({
  firstName: true,
  lastName: true,
  avatar: true,
}).partial()

export const ChangePasswordSchema = z
  .object({
    oldPassword: z.string({
      required_error: 'Mật khẩu cũ là bắt buộc',
    }),
    newPassword: UserSchema.shape.password,
    confirmPassword: z.string({
      required_error: 'Xác nhận mật khẩu là bắt buộc',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Mật khẩu mới và xác nhận mật khẩu không khớp',
        path: ['confirmPassword'],
      })
    }
  })
