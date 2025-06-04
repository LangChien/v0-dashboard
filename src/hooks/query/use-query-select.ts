import { QueryManager, useQueryManager } from '@/hooks/query/use-query-manager'
import { useState } from 'react'
import { Filter } from './common'

export const useQuerySelect = <T>(key: string, queryManager?: QueryManager) => {
  const [value, setValue] = useState<T | undefined>(undefined)
  const localQueryManager = useQueryManager()
  const { updateParam, searchParams } = queryManager ?? localQueryManager
  const onChange = (value: T) => {
    setValue(value)
  }
  const onClear = () => {
    setValue(undefined)
    const filterJson = searchParams.get('filter')
    const filter: Filter<T> = filterJson ? JSON.parse(filterJson) : {}
    delete filter[key]
    updateParam('filter', JSON.stringify(filter))
  }
  const onSubmit = () => {
    const filterJson = searchParams.get('filter')
    const filter: Filter<T> = filterJson ? JSON.parse(filterJson) : {}
    if (value === undefined) delete filter[key]
    else
      filter[key] = {
        equals: value,
      }
    updateParam('filter', JSON.stringify(filter))
  }
  return {
    value,
    onChange,
    onClear,
    onSubmit,
  }
}
export interface QuerySelect<T> extends ReturnType<typeof useQuerySelect<T>> {}
