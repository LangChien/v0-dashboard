export interface GenericCrud {
  entity: any
  createBodyDto: any
  updateBodyDto: any
  findManyResponse: any
  findOneByIdResponse: any
}

export interface PaginateMeta {
  page: number
  limit: number
  totalPage: number
  totalItem: number
}

export interface Paginate<T> {
  meta: PaginateMeta
  result: T[]
}

export interface BatchPayload {
  count: number
}
