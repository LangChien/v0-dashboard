import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Column } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface ColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>
  title: string
  className?: string
  columnName?: string
}

export const ColumnHeader = <TData, TValue>({
  column,
  title,
  className,
  columnName,
}: ColumnHeaderProps<TData, TValue>) => {
  const sortName = columnName ?? column.id
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const prevSort = searchParams.get('sort')
  const sort = prevSort?.split(',') ?? []
  const isColumnSortedASC = sort.includes(sortName)
  const isColumnSortedDESC = sort.includes(`-${sortName}`)
  const handleSort = () => {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    if (isColumnSortedASC) {
      sort.splice(sort.indexOf(sortName), 1)
      sort.push(`-${sortName}`)
    } else if (isColumnSortedDESC) {
      sort.splice(sort.indexOf(`-${sortName}`), 1)
    } else sort.push(`${sortName}`)

    params.set('sort', sort.join(','))
    if (sort.length === 0) {
      params.delete('sort')
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Button
        onClick={handleSort}
        variant='ghost'
        size='sm'
        className='-ml-3 h-8 data-[state=open]:bg-accent'
      >
        <span>{title}</span>
        {isColumnSortedDESC ? (
          <ArrowDown className='ml-2 h-4 w-4' />
        ) : isColumnSortedASC ? (
          <ArrowUp className='ml-2 h-4 w-4' />
        ) : (
          <ChevronsUpDown className='ml-2 h-4 w-4' />
        )}
      </Button>
    </div>
  )
}
