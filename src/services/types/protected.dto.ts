import { z } from 'zod'
import { ChangePasswordSchema, UpdateProfileSchema } from '../schemas/protected.schema'

export interface ChangePasswordBodyDto extends z.infer<typeof ChangePasswordSchema> {}
export interface UpdateProfileDto extends z.infer<typeof UpdateProfileSchema> {}
