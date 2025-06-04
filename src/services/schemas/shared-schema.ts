import { z } from 'zod'

/**
 *
 * @param fieldName Tên trường để hiển thị trong thông báo lỗi
 * @returns zod schema cho boolean
 * @description Sử dụng z.boolean để tạo schema cho boolean
 */
export const createBooleanSchema = (fieldName: string) =>
  z.boolean({
    required_error: `${fieldName} là bắt buộc`,
    invalid_type_error: `${fieldName} phải là boolean`,
  })

/**
 * @default length mặc định là 100 ký tự
 * @return zod schema cho chuỗi
 */
export const createStringSchema = (fieldName: string, length: number = 100) =>
  z
    .string({
      required_error: `${fieldName} là bắt buộc`,
      invalid_type_error: `${fieldName} phải là chuỗi`,
    })
    .trim()
    .toLowerCase()
    .min(1, { message: `${fieldName} không được để trống` })
    .max(length, { message: `${fieldName} không được vượt quá ${length} ký tự` })
    .transform((val) => val.charAt(0).toUpperCase() + val.slice(1))

/**
 * @returns zod schema cho số dương
 */
export const createNumberPositiveSchema = (fieldName: string) =>
  z
    .number({
      required_error: `${fieldName} là bắt buộc`,
    })
    .positive({ message: `${fieldName} phải là số dương` })

export const createNumberSchema = (fieldName: string) =>
  z.number({
    required_error: `${fieldName} là bắt buộc`,
  })

/**
 * @returns zod schema cho UUID
 */
export const createUuidSchema = (fieldName: string) =>
  z
    .string({
      required_error: `${fieldName} là bắt buộc`,
    })
    .uuid({ message: `${fieldName} phải là UUID hợp lệ` })

/**
 * @returns zod schema cho date (chấp nhận string hoặc Date)
 * @description Custom preprocess để chuyển đổi chuỗi hoặc đối tượng Date thành đối tượng Date hợp lệ
 * Nếu không hợp lệ, sẽ trả về undefined
 */
export const createDateSchema = (fieldName: string) =>
  z.union([z.string(), z.date()]).refine(
    (val) => {
      if (typeof val === 'string' || val instanceof Date) {
        const date = new Date(val)
        return !isNaN(date.getTime())
      }
      return false
    },
    {
      message: `${fieldName} phải là ngày hợp lệ`,
    },
  )
/**
 * @returns zod schema cho enum
 * @param enumObject Đối tượng enum cần tạo schema
 * @description Sử dụng z.nativeEnum để tạo schema từ enum
 * @description Không biết tại sao generate type bị lỗi
 */
export const createEnumSchema = (fieldName: string, enumObject: z.EnumLike) =>
  z.nativeEnum(enumObject, {
    required_error: `${fieldName} là bắt buộc`,
    invalid_type_error: `${fieldName} không hợp lệ`,
  })

/**
 * @description Schema cơ bản cho các thực thể có trường id, createdAt, updatedAt
 * @returns zod schema cho thực thể cơ bản
 */
export const BaseEntitySchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

/**
 * @description Schema cơ bản cho các thực thể có trường deletedAt, kế thừa từ BaseEntitySchema
 * @returns zod schema cho thực thể cơ bản với trường deletedAt
 */
export const BaseSoftDeleteEntitySchema = BaseEntitySchema.extend({
  deletedAt: z.coerce.date().nullable(),
})

export const OTP_TYPE = {
  VERIFY_EMAIL: 'VERIFY_EMAIL',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
} as const

export type OTP_TYPE = (typeof OTP_TYPE)[keyof typeof OTP_TYPE]

export const otpSchema = z
  .string({
    required_error: 'OTP là bắt buộc',
    invalid_type_error: 'OTP phải là chuỗi',
  })
  .length(6, {
    message: 'OTP phải có độ dài 6 ký tự',
  })
