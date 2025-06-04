import { z } from 'zod'
import { GenericCrud } from '../crud/crud.generic'
import {
  CreateHouseholdSchema,
  HouseholdIncludeCitizenSchema,
  HouseholdSchema,
  PaginateHouseholdSchema,
  UpdateHouseholdSchema,
} from '../schemas/household.schema'

// request dto
export interface CreateHouseholdDto extends z.infer<typeof CreateHouseholdSchema> {}
export interface UpdateHouseholdDto extends z.infer<typeof UpdateHouseholdSchema> {}

// response dto
export interface Household extends z.infer<typeof HouseholdSchema> {}
export interface HouseholdIncludeCitizen extends z.infer<typeof HouseholdIncludeCitizenSchema> {}
export interface PaginateHousehold extends z.infer<typeof PaginateHouseholdSchema> {}

export interface GenericCrudHousehold extends GenericCrud {
  entity: Household
  createBodyDto: CreateHouseholdDto
  updateBodyDto: UpdateHouseholdDto
  findManyResponse: PaginateHousehold
  findOneByIdResponse: HouseholdIncludeCitizen
}
