import { UserSchema } from './user.schema'

export const ChangeRoleSchema = UserSchema.pick({
  role: true,
})
