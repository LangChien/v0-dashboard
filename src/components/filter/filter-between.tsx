import { FilterItem } from '@/components/filter/filter-item'
import { Input } from '@/components/ui/input'
import { QueryBetween } from '@/hooks/query/use-query-between'
import { Minus } from 'lucide-react'
import { FC } from 'react'

export const FilterBetween: FC<{
  query: QueryBetween<number>
  title: string
}> = ({ query, title }) => {
  const { from, to, setFrom, setTo } = query
  return (
    <FilterItem title={title}>
      <div className='flex w-full items-center gap-x-2'>
        <Input
          value={from !== undefined ? from : ''}
          onChange={(e) => setFrom(e.target.value ? +e.target.value : undefined)}
          type='number'
          className='w-16 flex-1'
        />
        <Minus />
        <Input
          value={to !== undefined ? to : ''}
          onChange={(e) => setTo(e.target.value ? +e.target.value : undefined)}
          type='number'
          className='w-16 flex-1'
        />
      </div>
    </FilterItem>
  )
}
