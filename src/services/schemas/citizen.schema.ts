import { z } from 'zod'
import {
  baseQuerySchema,
  createPaginateResponseSchema,
  dateTimeFilterSchema,
  getEnumFilterSchema,
  intFilterSchema,
} from './shared-query-schema'
import {
  BaseEntitySchema,
  createDateSchema,
  createNumberPositiveSchema,
  createStringSchema,
} from './shared-schema'

export const GENDER = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER',
} as const

export type GENDER = (typeof GENDER)[keyof typeof GENDER]

const GenderSchema = z.nativeEnum(GENDER, {
  required_error: 'Giới tính là bắt buộc',
  invalid_type_error: 'Giới tính không hợp lệ',
})

export const CitizenSchema = BaseEntitySchema.extend({
  fullName: createStringSchema('Họ và tên'),
  age: createNumberPositiveSchema('Tuổi'),
  dateOfBirth: createDateSchema('Ngày sinh'),
  gender: GenderSchema,
  ethnicity: createStringSchema('Dân tộc'),
  religion: createStringSchema('Tôn giáo'),
  nationalId: createStringSchema('Số CMND/CCCD', 20),
  issueDate: createDateSchema('Ngày cấp'),
  issuePlace: createStringSchema('Nơi cấp'),
  occupation: createStringSchema('Nghề nghiệp'),
})

export const CreateCitizenSchema = CitizenSchema.pick({
  fullName: true,
  age: true,
  dateOfBirth: true,
  ethnicity: true,
  religion: true,
  nationalId: true,
  issueDate: true,
  issuePlace: true,
  occupation: true,
  gender: true,
})

export const UpdateCitizenSchema = CreateCitizenSchema.partial()

export const CitizenQuerySchema = baseQuerySchema.extend({
  filter: z
    .object({
      gender: getEnumFilterSchema(GENDER).optional(),
      issueDate: dateTimeFilterSchema.optional(),
      age: intFilterSchema.optional(),
      dateOfBirth: dateTimeFilterSchema.optional(),
    })
    .optional()
    .default({}),
})

export const PaginateCitizenSchema = createPaginateResponseSchema(CitizenSchema)
