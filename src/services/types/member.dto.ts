import { z } from 'zod'
import { GenericCrud } from '../crud/crud.generic'
import {
  ChangeHeadSchema,
  CreateMemberSchema,
  MemberIncludeHouseholdAndCitizenSchema,
  MemberQuerySchema,
  MemberSchema,
  PaginateMembersSchema,
  SplitHouseholdSchema,
  UpdateMemberSchema,
} from '../schemas/member.schema'

// request dto
export interface CreateHouseholdMemberDto extends z.infer<typeof CreateMemberSchema> {}
export interface UpdateHouseholdMemberDto extends z.infer<typeof UpdateMemberSchema> {}
export interface ChangeHeadDto extends z.infer<typeof ChangeHeadSchema> {}
export interface SplitHouseholdDto extends z.infer<typeof SplitHouseholdSchema> {}
export interface MemberQuery extends z.infer<typeof MemberQuerySchema> {}

// response dto
export interface MemberIncludeHouseholdAndCitizen
  extends z.infer<typeof MemberIncludeHouseholdAndCitizenSchema> {}
export interface PaginateHouseholdMember extends z.infer<typeof PaginateMembersSchema> {}
export interface HouseholdMember extends z.infer<typeof MemberSchema> {}

export interface GenericCrudHouseholdMember extends GenericCrud {
  entity: HouseholdMember
  createBodyDto: CreateHouseholdMemberDto
  updateBodyDto: UpdateHouseholdMemberDto
  findManyResponse: PaginateHouseholdMember
  findOneByIdResponse: MemberIncludeHouseholdAndCitizen
}
