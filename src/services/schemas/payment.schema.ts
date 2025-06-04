import { z } from 'zod'
import { FeeSchema } from './fee.schema'
import { HouseholdSchema } from './household.schema'
import {
  baseQuerySchema,
  createPaginateResponseSchema,
  dateTimeFilterSchema,
  intFilterSchema,
} from './shared-query-schema'
import {
  BaseEntitySchema,
  createNumberSchema,
  createStringSchema,
  createUuidSchema,
} from './shared-schema'

export const PaymentSchema = BaseEntitySchema.extend({
  householdId: createUuidSchema('Mã hộ gia đình'),
  feeId: createUuidSchema('Mã khoản phí'),
  payerName: createStringSchema('Tên người nộp', 100),
  amount: createNumberSchema('Số tiền nộp'),
})

export const CreatePaymentSchema = PaymentSchema.pick({
  householdId: true,
  feeId: true,
  payerName: true,
  amount: true,
  createdAt: true,
})

export const GetPaymentSchema = PaymentSchema.extend({
  household: HouseholdSchema,
  fee: FeeSchema,
})

export const PaymentQuerySchema = baseQuerySchema.extend({
  filter: z
    .object({
      amount: intFilterSchema.optional(),
      createdAt: dateTimeFilterSchema.optional(),
    })
    .optional()
    .default({}),
})

export const UpdatePaymentSchema = CreatePaymentSchema.partial()

export const PaymentPaginateResponseSchema = createPaginateResponseSchema(GetPaymentSchema)
