import { FilterItem } from '@/components/filter'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { QueryIn } from '@/hooks/query/use-query-in'
import { CheckedState } from '@radix-ui/react-checkbox'
import { FC, ReactNode } from 'react'

export const FilterIn: FC<{
  query: QueryIn
  title: string
  options: {
    value: string
    label: ReactNode
  }[]
}> = ({ query, title, options }) => {
  const { handleAdd, handleRemove, values } = query
  const handleChange = (checkedState: CheckedState, value: string) => {
    if (checkedState) handleAdd(value)
    else handleRemove(value)
  }
  return (
    <FilterItem title={title}>
      <div className='space-y-2'>
        {options.map((option) => (
          <div key={`${title}-filter-in-${option.value}`} className='flex items-center space-x-2'>
            <Checkbox
              checked={values.includes(option.value)}
              onCheckedChange={(e) => handleChange(e, option.value)}
              id={`${title}-filter-in-${option.value}`}
            />
            <Label
              htmlFor={`${title}-filter-in-${option.value}`}
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </FilterItem>
  )
}
