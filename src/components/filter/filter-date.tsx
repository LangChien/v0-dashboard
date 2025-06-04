import { FilterItem } from '@/components/filter/filter-item'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { QueryBetween } from '@/hooks/query/use-query-between'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon, CircleX, Minus } from 'lucide-react'
import { FC } from 'react'

export const FilterDate: FC<{
  query: QueryBetween<Date>
  title: string
}> = ({ query, title }) => {
  const { from, to, setFrom, setTo, handleClear } = query

  const handleSetFrom = (date: Date | undefined) => {
    setFrom(date || undefined)
  }

  const handleSetTo = (date: Date | undefined) => {
    setTo(date || undefined)
  }

  return (
    <FilterItem title={title}>
      <div className='flex items-center gap-x-2'>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={'outline'} className={cn('w-full', !from && 'text-muted-foreground')}>
              {from ? format(from, 'PPP') : <span>{title}</span>}
              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='start'>
            <Calendar
              mode='single'
              selected={from}
              onSelect={handleSetFrom}
              className='rounded-md border'
            />
          </PopoverContent>
        </Popover>
        <Minus />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={'outline'} className={cn('w-full', !to && 'text-muted-foreground')}>
              {to ? format(to, 'PPP') : <span>{title}</span>}
              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='start'>
            <Calendar
              mode='single'
              selected={to}
              onSelect={handleSetTo}
              className='rounded-md border'
            />
          </PopoverContent>
        </Popover>
        <Button onClick={handleClear} variant='link' className='text-red-500'>
          <CircleX />
        </Button>
      </div>
    </FilterItem>
  )
}
