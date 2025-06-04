import { z } from 'zod'
import {
  baseQuerySchema,
  booleanFilterSchema,
  createPaginateResponseSchema,
  dateTimeFilterSchema,
  intFilterSchema,
} from './shared-query-schema'
import {
  BaseEntitySchema,
  createBooleanSchema,
  createDateSchema,
  createNumberPositiveSchema,
  createNumberSchema,
  createStringSchema,
} from './shared-schema'

export const FEE_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
} as const

export type FEE_STATUS = (typeof FEE_STATUS)[keyof typeof FEE_STATUS]

const FeeStatusSchema = z.nativeEnum(FEE_STATUS, {
  required_error: 'Trạng thái là bắt buộc',
})

export const FeeSchema = BaseEntitySchema.extend({
  dueDate: createDateSchema('Ngày hết hạn'),
  name: createStringSchema('Tên khoản phí'),
  amount: createNumberSchema('Số tiền'),
  description: createStringSchema('Mô tả', 500),
  status: FeeStatusSchema,
  isMandatory: createBooleanSchema('Trạng thái bắt buộc'),
  totalHouseholds: createNumberPositiveSchema('Tổng số hộ gia đình'),
})

export const CreateFeeSchema = FeeSchema.pick({
  name: true,
  amount: true,
  dueDate: true,
  description: true,
  totalHouseholds: true,
  isMandatory: true,
}).partial({
  totalHouseholds: true,
  isMandatory: true,
})

export const UpdateFeeSchema = CreateFeeSchema.partial()

export const FeeQuerySchema = baseQuerySchema.extend({
  filter: z
    .object({
      createdAt: dateTimeFilterSchema.optional(),
      dueDate: dateTimeFilterSchema.optional(),
      amount: intFilterSchema.optional(),
      isOpen: booleanFilterSchema.optional(),
      isMandatory: booleanFilterSchema.optional(),
      totalHouseholds: intFilterSchema.optional(),
    })
    .optional()
    .default({}),
})

export const FeeInludeCountIncludeCountSchema = FeeSchema.extend({
  _count: z.object({
    payments: z.number(),
  }),
})
export const PaginateFeeInludeCountSchema = createPaginateResponseSchema(
  FeeInludeCountIncludeCountSchema,
)
export const FeeFilterSchema = z.object({
  status: z.nativeEnum(FEE_STATUS).optional(),
  search: z.string().optional(),
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
  isMandatory: z.boolean().optional(),
})

export interface FeeFilterDto extends z.infer<typeof FeeFilterSchema> {}
