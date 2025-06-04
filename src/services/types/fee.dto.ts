import { z } from 'zod'
import { GenericCrud } from '../crud/crud.generic'
import {
  CreateFeeSchema,
  FeeInludeCountIncludeCountSchema,
  FeeQuerySchema,
  FeeSchema,
  PaginateFeeInludeCountSchema,
  UpdateFeeSchema,
} from '../schemas/fee.schema'

// request DTOs
export interface CreateFeeDto extends z.infer<typeof CreateFeeSchema> {}
export interface UpdateFeeDto extends z.infer<typeof UpdateFeeSchema> {}
export interface FeeQueryDto extends z.infer<typeof FeeQuerySchema> {}

// response DTOs
export interface FeeInludeCount extends z.infer<typeof FeeInludeCountIncludeCountSchema> {}
export interface PaginateFee extends z.infer<typeof PaginateFeeInludeCountSchema> {}
export interface Fee extends z.infer<typeof FeeSchema> {}

// request

export interface GenericCrudFee extends GenericCrud {
  entity: Fee
  createBodyDto: CreateFeeDto
  updateBodyDto: UpdateFeeDto
  findManyResponse: PaginateFee
  findOneByIdResponse: FeeInludeCount
}

export interface FeeStatistics {
  total: number // Tổng số giao dịch
  pending: number // Số giao dịch đang chờ xử lý
  approved: number // Số giao dịch đã được phê duyệt
  completed: number // Số giao dịch đã hoàn thành
  rejected: number // Số giao dịch bị từ chối
  canceled: number // Số giao dịch đã hủy
  totalAmount: number // Tổng số tiền đã giao dịch
  collectedAmount: number // Tổng số tiền đã thu
}
