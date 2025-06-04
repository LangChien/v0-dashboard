import { z, ZodType as ZodSchema } from 'zod'

export const baseQuerySchema = z.object({
  page: z.coerce.number().min(1, { message: 'Page phải lớn hơn hoặc bằng 1' }).default(1),
  limit: z.coerce.number().min(-1, { message: 'Limit phải lớn hơn hoặc bằng 1' }).default(20),
  search: z.string().optional(),
  sort: z
    .union([z.string(), z.array(z.string())])
    .transform((val) => (Array.isArray(val) ? val : val.split(',')))
    .default(['-updatedAt']),
  filter: z.object({}).optional().default({}),
})

export const IdParamSchema = z.object({
  id: z.string({ required_error: 'ID không được để trống' }).uuid({ message: 'ID không hợp lệ' }),
})

export const IdsQuerySchema = z.object({
  ids: z.union([
    z
      .string({ required_error: 'IDs không được để trống' })
      .transform((val) => (Array.isArray(val) ? val : val.split(','))),
    z.array(z.string().uuid({ message: 'ID không hợp lệ' })),
  ]),
})

export const intFilterSchema = z.object({
  equals: z.number().optional(),
  in: z.array(z.number()).optional(),
  notIn: z.array(z.number()).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
})

export const dateTimeFilterSchema = z.object({
  equals: z.coerce.date().optional(),
  in: z.array(z.coerce.date()).optional(),
  notIn: z.array(z.coerce.date()).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.coerce.date().optional(),
})

export const booleanFilterSchema = z.object({
  equals: z.boolean().optional(),
})

export const getEnumFilterSchema = <T extends Record<string, string>>(enumObj: T) =>
  z.object({
    equals: z.nativeEnum(enumObj).optional(),
    in: z.array(z.nativeEnum(enumObj)).optional(),
    notIn: z.array(z.nativeEnum(enumObj)).optional(),
    not: z.nativeEnum(enumObj).optional(),
  })

export const filterSchema = (object: ZodSchema) =>
  baseQuerySchema.extend({
    filter: object.optional().default({}),
  })
// response schemas

export const paginateMetaSchema = z.object({
  page: z.number(),
  limit: z.number(),
  totalPage: z.number(),
  totalItem: z.number(),
})

export const createPaginateResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    meta: paginateMetaSchema,
    result: z.array(itemSchema),
  })

export const stringFilterSchema = z.object({
  equals: z.string().optional(),
  in: z.array(z.string()).optional(),
  notIn: z.array(z.string()).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.enum(['default', 'insensitive']).optional(),
})

export type BaseQueryType = z.infer<typeof baseQuerySchema>
export type StringFilterType = z.infer<typeof stringFilterSchema>
// response schemas

export type MetaDataType = z.infer<typeof paginateMetaSchema>
