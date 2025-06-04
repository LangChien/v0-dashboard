'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { useQueryIn } from '@/hooks/query/use-query-in'
import { QueryManager } from '@/hooks/query/use-query-manager'
import { CirclePlus } from 'lucide-react'
import { Fragment, ReactNode, Suspense } from 'react'

interface ColumnFilterProps {
  options: {
    label: ReactNode
    value: string
  }[]
  title: string
  fieldName: string
  queryManager?: QueryManager
}

export const FieldFilter = (props: ColumnFilterProps) => {
  return (
    <Suspense>
      <Main {...props} />
    </Suspense>
  )
}

const Main = ({ title, fieldName, options, queryManager }: ColumnFilterProps) => {
  const { handleAdd, handleClear, handleRemove, handleSubmit, values } = useQueryIn(
    fieldName,
    queryManager,
  )
  const onCheckedChange = (value: string, checked: boolean) => {
    if (checked) handleAdd(value)
    else handleRemove(value)
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='h-8 border-dashed'>
          <CirclePlus className='mr-2 h-4 w-4' />
          {title}
          {values.length > 0 && (
            <Fragment>
              <Separator orientation='vertical' className='mx-2 h-4' />
              <Badge variant='secondary' className='rounded-sm px-1 font-normal lg:hidden'>
                {values.length}
              </Badge>
              <div className='hidden space-x-1 lg:flex'>
                {values.length > 3 ? (
                  <Badge variant='secondary' className='rounded-sm px-1 font-normal'>
                    {values.length} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => values.includes(option.value))
                    .map((option) => (
                      <Badge
                        variant='secondary'
                        key={option.value}
                        className='rounded-sm px-1 font-normal'
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </Fragment>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0' align='start'>
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>Không tìm thấy kết quả</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = values.includes(option.value)
                return (
                  <CommandItem value={option.value} className='flex gap-3' key={option.value}>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(e) => onCheckedChange(option.value, !!e)}
                    />
                    {option.label}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem className='justify-center text-center flex gap-3'>
                <Button onClick={handleClear} variant='destructive'>
                  Đặt lại
                </Button>
                <Button onClick={handleSubmit}> Cập nhật</Button>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
