import { SearchForm } from '@/components/common/search-form'
import { TableViewOptions } from '@/components/table-helpper'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useRequest } from '@/hooks/use-request'
import { citizenRequest } from '@/services/routes/citizen.request'
import { Citizen } from '@/services/types/citizen.dto'
import { Table } from '@tanstack/react-table'
import { UserPlus } from 'lucide-react'
import Link from 'next/link'
import { CitizenFilter } from './citizen.filter'

export const CitizenTableToolbar = ({ table }: { table: Table<Citizen> }) => {
  const ids = table.getSelectedRowModel().flatRows.map((row) => row.original.id)
  const handleDeleteMany = useRequest(async () => {
    const res = await citizenRequest.deleteMany(ids)
    table.resetRowSelection()
    return res
  })
  return (
    <div className='flex items-center gap-x-3 py-4'>
      <SearchForm placeholder='Nhập id, tên hoặc số CMND/CCCD' className='w-[300px]' />
      <CitizenFilter />
      <TableViewOptions className='ms-auto' table={table} />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link passHref href='/dashboard/citizen/create'>
              <Button>
                <UserPlus />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>Thêm công dân mới</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={handleDeleteMany} variant='destructive' disabled={ids.length === 0}>
              Xóa
            </Button>
          </TooltipTrigger>
          <TooltipContent>Xóa các mục đã chọn</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
