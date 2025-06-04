import { FilterItem } from '@/components/filter/filter-item'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { QuerySelect } from '@/hooks/query/use-query-select'
import { FC, ReactNode } from 'react'

export const FilterRadio: FC<{
  title: string
  query: QuerySelect<string>
  options: {
    value: string
    label: ReactNode
  }[]
}> = ({ title, query, options }) => {
  const { value, onChange } = query
  return (
    <FilterItem title={title}>
      <RadioGroup onValueChange={onChange} value={value || ''}>
        {options.map((option) => (
          <div key={`${title}-${option.value}`} className='flex items-center space-x-2'>
            <RadioGroupItem value={option.value} id={`${title}-${option.value}`} />
            <Label htmlFor={`${title}-${option.value}`}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </FilterItem>
  )
}
