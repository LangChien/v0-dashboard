import { z } from 'zod'
import { CitizenSchema } from './citizen.schema'
import { CreateHouseholdSchema, HouseholdSchema } from './household.schema'
import { baseQuerySchema, createPaginateResponseSchema } from './shared-query-schema'
import { BaseEntitySchema, createUuidSchema } from './shared-schema'

export const REL_HEAD = {
  SPOUSE: 'SPOUSE',
  CHILD: 'CHILD',
  PARENT: 'PARENT',
  SIBLING: 'SIBLING',
  GRANDPARENT: 'GRANDPARENT',
  GRANDCHILD: 'GRANDCHILD',
  OTHER: 'OTHER',
} as const

export type REL_HEAD = (typeof REL_HEAD)[keyof typeof REL_HEAD]

export const HH_CHANGE = {
  CREATE: 'CREATE',
  ADD_MEMBER: 'ADD_MEMBER',
  REMOVE_MEMBER: 'REMOVE_MEMBER',
  CHANGE_HEAD: 'CHANGE_HEAD',
  SPLIT_HOUSEHOLD: 'SPLIT_HOUSEHOLD',
  TEMP_RESIDENCE: 'TEMP_RESIDENCE',
  CHANGE_RELATION: 'CHANGE_RELATION',
} as const

export type HH_CHANGE = (typeof HH_CHANGE)[keyof typeof HH_CHANGE]

const RelationWithHeadSchema = z.nativeEnum(REL_HEAD, {
  required_error: 'Quan hệ với chủ hộ là bắt buộc',
  invalid_type_error: 'Quan hệ với chủ hộ không hợp lệ',
})

export const MemberSchema = BaseEntitySchema.extend({
  householdId: createUuidSchema('ID hộ khẩu'),
  citizenId: createUuidSchema('ID công dân'),
  relationWithHead: RelationWithHeadSchema,
})

export const MemberIncludeHouseholdAndCitizenSchema = MemberSchema.extend({
  household: HouseholdSchema,
  citizen: CitizenSchema,
})

export const CreateMemberSchema = MemberSchema.pick({
  householdId: true,
  citizenId: true,
  relationWithHead: true,
})

export const UpdateMemberSchema = MemberSchema.pick({
  relationWithHead: true,
  householdId: true,
}).partial()

export const ChangeHeadSchema = z.object({
  newHeadCitizenId: createUuidSchema('ID công dân của chủ hộ mới'),
  oldHeadRelation: RelationWithHeadSchema,
  memberRelations: z.array(
    z.object({
      memberId: createUuidSchema('ID thành viên'),
      relationWithNewHead: RelationWithHeadSchema,
    }),
  ),
})

export const SplitHouseholdSchema = CreateHouseholdSchema.extend({
  membersToMove: z.array(
    z.object({
      memberId: createUuidSchema('ID thành viên'),
      relationWithNewHead: RelationWithHeadSchema,
    }),
  ),
})

export const MemberQuerySchema = baseQuerySchema.extend({
  householdId: z.string().optional(),
})

export const PaginateMembersSchema = createPaginateResponseSchema(
  MemberIncludeHouseholdAndCitizenSchema,
)
