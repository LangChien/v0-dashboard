import { z } from 'zod'
import { CitizenSchema } from './citizen.schema'
import { createPaginateResponseSchema } from './shared-query-schema'
import { BaseEntitySchema, createStringSchema, createUuidSchema } from './shared-schema'

export const HouseholdSchema = BaseEntitySchema.extend({
  houseNumber: createStringSchema('Số nhà'),
  address: createStringSchema('Địa chỉ', 255),
  headCitizenId: createUuidSchema('Id chủ hộ'),
})

export const HouseholdIncludeCitizenSchema = HouseholdSchema.extend({
  headCitizen: CitizenSchema,
  _count: z.object({
    members: z.number(),
  }),
})

export const CreateHouseholdSchema = HouseholdSchema.pick({
  houseNumber: true,
  address: true,
  headCitizenId: true,
})

export const UpdateHouseholdSchema = CreateHouseholdSchema.partial()

export const PaginateHouseholdSchema = createPaginateResponseSchema(HouseholdIncludeCitizenSchema)
