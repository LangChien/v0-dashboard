import { envConfig } from '@/config/env.config'
import { getOptionWithAccessToken } from '@/lib/action'
import { HttpOption, NotFoundException, http } from '@/lib/http'
import { delay } from '@/lib/utils'
import { BatchPayload, GenericCrud } from './crud.generic'

interface Option {
  httpOption?: HttpOption
  isClient?: boolean
}

export abstract class CurdRequest<T extends GenericCrud = GenericCrud> {
  protected prefix: string
  protected http = http
  constructor(prefix: string) {
    this.prefix = prefix
  }

  async getMany(searchParams?: Record<string, any>, option?: Option) {
    const isClient = option?.isClient
    const accsessTokenOption = await getOptionWithAccessToken(isClient)
    let query = this.prefix
    query += searchParams ? `?${new URLSearchParams(searchParams).toString()}` : ''
    const httpOption = option?.httpOption ?? {}
    return this.http.get<T['findManyResponse']>(query, {
      ...accsessTokenOption,
      ...httpOption,
    })
  }

  async getOneById(id: string, option?: Option) {
    const isClient = option?.isClient
    const accsessTokenOption = await getOptionWithAccessToken(isClient)
    const httpOption = option?.httpOption ?? {}
    return this.http.get<T['findOneByIdResponse']>(`${this.prefix}/${id}`, {
      ...accsessTokenOption,
      ...httpOption,
    })
  }

  async getOneByIdOrNull(id: string, option?: Option) {
    try {
      return await this.getOneById(id, option)
    } catch (error) {
      if (error instanceof NotFoundException) return null
      throw error
    }
  }

  async create(data: T['createBodyDto'], httpOption?: HttpOption) {
    await delay(envConfig.DELAY_TIME)
    const accsessTokenOption = await getOptionWithAccessToken(true)
    return this.http.post<T['entity']>(this.prefix, data, {
      ...accsessTokenOption,
      ...httpOption,
    })
  }

  async update(id: string, data: T['updateBodyDto'], httpOption?: HttpOption) {
    await delay(envConfig.DELAY_TIME)
    const accsessTokenOption = await getOptionWithAccessToken(true)
    return this.http.patch<T['entity']>(`${this.prefix}/${id}`, data, {
      ...accsessTokenOption,
      ...httpOption,
    })
  }

  async delete(id: string, httpOption?: HttpOption) {
    await delay(envConfig.DELAY_TIME)
    const accsessTokenOption = await getOptionWithAccessToken(true)
    return this.http.delete(`${this.prefix}/${id}`, {
      ...accsessTokenOption,
      ...httpOption,
    })
  }
  async deleteMany(ids: string[], httpOption?: HttpOption) {
    await delay(envConfig.DELAY_TIME)
    const url = `${this.prefix}?ids=${ids}`
    const accsessTokenOption = await getOptionWithAccessToken(true)
    return this.http.delete<BatchPayload>(url, {
      ...accsessTokenOption,
      ...httpOption,
    })
  }
}
