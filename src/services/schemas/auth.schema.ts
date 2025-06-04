import { z } from 'zod'
import { OTP_TYPE, otpSchema } from './shared-schema'
import { UserSchema } from './user.schema'

export const LoginSchema = UserSchema.pick({
  email: true,
  password: true,
})

export const RegisterSchema = UserSchema.pick({
  email: true,
  password: true,
  firstName: true,
  lastName: true,
  avatar: true,
})
  .extend({
    otpToken: z.string({
      required_error: 'Mã xác thực là bắt buộc',
    }),
    confirmPassword: z.string({
      required_error: 'Xác nhận mật khẩu là bắt buộc',
      invalid_type_error: 'Xác nhận mật khẩu phải là chuỗi',
    }),
    isAcceptTerms: z.boolean({
      required_error: 'Bạn phải đồng ý với điều khoản sử dụng',
      invalid_type_error: 'Bạn phải đồng ý với điều khoản sử dụng',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Mật khẩu và xác nhận mật khẩu không khớp',
        path: ['confirmPassword'],
      })
    }
    if (!data.isAcceptTerms) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Bạn phải đồng ý với điều khoản sử dụng',
        path: ['isAcceptTerms'],
      })
    }
  })

export const RefreshTokenSchema = z.object({
  refreshToken: z.string({
    required_error: 'Refresh token là bắt buộc',
    invalid_type_error: 'Refresh token phải là chuỗi',
  }),
})

export const LogoutSchema = RefreshTokenSchema

export const ResetPasswordSchema = z
  .object({
    password: UserSchema.shape.password,
    otpToken: z.string({
      required_error: 'Mã xác thực là bắt buộc',
      invalid_type_error: 'Mã xác thực phải là chuỗi',
    }),
    confirmPassword: z.string({
      required_error: 'Xác nhận mật khẩu là bắt buộc',
      invalid_type_error: 'Xác nhận mật khẩu phải là chuỗi',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Mật khẩu và xác nhận mật khẩu không khớp',
        path: ['confirmPassword'],
      })
    }
  })

export const SendOtpEmailSchema = z.object({
  email: UserSchema.shape.email,
  otpType: z.nativeEnum(OTP_TYPE, {
    required_error: 'Loại OTP là bắt buộc',
  }),
})

export const VerifyOtpSchema = SendOtpEmailSchema.extend({
  otp: otpSchema,
})

// otp schema
export const OtpSchema = z.object({
  email: UserSchema.shape.email,
  otp: otpSchema,
  createdAt: z.coerce.date(),
  expiredAt: z.coerce.date(),
  type: z.nativeEnum(OTP_TYPE),
})

export const CreateOtpSchema = OtpSchema.pick({
  email: true,
  otp: true,
  type: true,
  expiredAt: true,
})
export const UpdateOtpSchema = OtpSchema.omit({
  email: true,
  type: true,
}).partial()

export const EmailTypeSchema = OtpSchema.pick({
  email: true,
  type: true,
})
