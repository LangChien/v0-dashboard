import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Table } from '@tanstack/react-table'
import { Eye, EyeClosed, Settings } from 'lucide-react'

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
  className?: string
}

export const TableViewOptions = <TData,>({
  table,
  className,
}: DataTableViewOptionsProps<TData>) => {
  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm' className={cn('h-8 flex', className)}>
                <Settings className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Tuỳ chọn hiển thị bảng</TooltipContent>
        </Tooltip>
        <DropdownMenuContent align='end' className='w-[200px]'>
          <DropdownMenuLabel>Ẩn/Hiện</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className='capitalize'
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  icon={{ checked: <Eye />, unchecked: <EyeClosed /> }}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  )
}
