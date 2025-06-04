import { z } from 'zod'
import { CitizenSchema } from './citizen.schema'
import { HH_CHANGE } from './member.schema'
import { createDateSchema, createUuidSchema } from './shared-schema'

export const ChangeHistorySchema = z.object({
  id: createUuidSchema('ID lịch sử thay đổi hộ khẩu'),
  householdId: createUuidSchema('ID hộ khẩu'),
  citizenId: createUuidSchema('ID công dân'),
  changeTime: createDateSchema('Thời gian thay đổi'),
  changeType: z.nativeEnum(HH_CHANGE, {
    required_error: 'Loại thay đổi hộ khẩu là bắt buộc',
    invalid_type_error: 'Loại thay đổi hộ khẩu không hợp lệ',
  }),
})

export const ChangeHistoryIncludeCitizen = ChangeHistorySchema.extend({
  citizen: CitizenSchema,
})

export type ChangeHistoryIncludeCitizen = z.infer<typeof ChangeHistoryIncludeCitizen>
