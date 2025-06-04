import { z } from 'zod'
import { GenericCrud } from '../crud/crud.generic'
import {
  CreatePaymentSchema,
  GetPaymentSchema,
  PaymentPaginateResponseSchema,
  PaymentQuerySchema,
  PaymentSchema,
  UpdatePaymentSchema,
} from '../schemas/payment.schema'

// request dto
export interface CreatePaymentDto extends z.infer<typeof CreatePaymentSchema> {}
export interface UpdatePaymentDto extends z.infer<typeof UpdatePaymentSchema> {}
export interface PaymentQuery extends z.infer<typeof PaymentQuerySchema> {}

// response dto
export interface Payment extends z.infer<typeof PaymentSchema> {}
export interface PaymentIncludeHouseholdAndCitizen extends z.infer<typeof GetPaymentSchema> {}
export interface PaginatePayment extends z.infer<typeof PaymentPaginateResponseSchema> {}

export interface GenericCrudPayment extends GenericCrud {
  entity: Payment
  createBodyDto: CreatePaymentDto
  updateBodyDto: UpdatePaymentDto
  findManyResponse: PaginatePayment
  findOneByIdResponse: PaymentIncludeHouseholdAndCitizen
}
