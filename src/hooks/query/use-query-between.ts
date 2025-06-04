import { QueryManager, useQueryManager } from '@/hooks/query/use-query-manager'
import { useState } from 'react'
import { Filter, FILTER_KEY } from './common'

export const useQueryBetween = <T>(key: string, queryManager?: QueryManager) => {
  const localQueryManager = useQueryManager()
  const { updateParam, searchParams } = queryManager || localQueryManager
  const [to, setTo] = useState<T | undefined>()
  const [from, setFrom] = useState<T | undefined>()

  const handleSubmit = () => {
    const filterJson = searchParams.get('filter')
    const filter: Filter<T> = filterJson ? JSON.parse(filterJson) : {}
    if (to === undefined && from === undefined) delete filter[key]
    else
      filter[key] = {
        gte: from,
        lte: to,
      }
    updateParam(FILTER_KEY, JSON.stringify({}))
  }

  const handleClear = () => {
    setTo(undefined)
    setFrom(undefined)
    const filterJson = queryManager?.searchParams.get('filter')
    const filter: Filter<T> = filterJson ? JSON.parse(filterJson) : {}
    delete filter[key]
    updateParam(FILTER_KEY, JSON.stringify(filter))
  }

  return {
    to,
    setTo,
    from,
    setFrom,
    handleSubmit,
    handleClear,
  }
}

export interface QueryBetween<T> extends ReturnType<typeof useQueryBetween<T>> {}
