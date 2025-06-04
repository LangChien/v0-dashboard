import { QueryManager, useQueryManager } from '@/hooks/query/use-query-manager'
import { useState } from 'react'
import { Filter, FILTER_KEY } from './common'

export const useQueryIn = <T>(key: string, queryManager?: QueryManager) => {
  const localQueryManager = useQueryManager()
  const [values, setValues] = useState<T[]>([])

  const { updateParam, searchParams } = queryManager || localQueryManager

  const handleClear = () => {
    setValues([])
    const filterJson = searchParams.get('filter')
    const filter: Filter<T> = filterJson ? JSON.parse(filterJson) : {}
    delete filter[key]
    updateParam(FILTER_KEY, JSON.stringify(filter))
  }

  const handleAdd = (value: T) => {
    setValues((prev) => [...prev, value])
  }

  const handleRemove = (value: T) => {
    setValues((prev) => prev.filter((item) => item !== value))
  }

  const handleSubmit = () => {
    const filterJson = searchParams.get('filter')
    const filter: Filter<T> = filterJson ? JSON.parse(filterJson) : {}
    if (values.length === 0) delete filter[key]
    else
      filter[key] = {
        in: values,
      }
    updateParam(FILTER_KEY, JSON.stringify(filter))
  }

  return {
    values,
    setValues,
    handleClear,
    handleAdd,
    handleRemove,
    handleSubmit,
  }
}
export interface QueryIn extends ReturnType<typeof useQueryIn> {}
