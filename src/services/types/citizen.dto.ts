import { z } from 'zod'
import { GenericCrud } from '../crud/crud.generic'
import {
  CitizenQuerySchema,
  CitizenSchema,
  CreateCitizenSchema,
  PaginateCitizenSchema,
  UpdateCitizenSchema,
} from '../schemas/citizen.schema'

// response types
export interface Citizen extends z.infer<typeof CitizenSchema> {}
export interface PaginateCitizen extends z.infer<typeof PaginateCitizenSchema> {}

// request types
export interface CreateCitizenDto extends z.infer<typeof CreateCitizenSchema> {}
export interface UpdateCitizenDto extends z.infer<typeof UpdateCitizenSchema> {}
export interface CitizenQuery extends z.infer<typeof CitizenQuerySchema> {}

export interface GenericCrudCitizen extends GenericCrud {
  entity: Citizen
  createBodyDto: CreateCitizenDto
  updateBodyDto: UpdateCitizenDto
  findManyResponse: PaginateCitizen
  findOneByIdResponse: Citizen
}
