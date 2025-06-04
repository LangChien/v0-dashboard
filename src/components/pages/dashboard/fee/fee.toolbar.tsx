import { SearchForm } from '@/components/common/search-form'
import { TableViewOptions } from '@/components/table-helpper'
import { Button } from '@/components/ui/button'
import { useRequest } from '@/hooks/use-request'
import { feeRequest } from '@/services/routes/fee.request'
import { FeeInludeCount } from '@/services/types/fee.dto'
import { Table } from '@tanstack/react-table'
import Link from 'next/link'
import { FeeFilter } from './fee.filter'

export const FeeActionToolbar = ({ table }: { table: Table<FeeInludeCount> }) => {
  const ids = table.getSelectedRowModel().flatRows.map((row) => row.original.id)
  const handleDeleteMany = useRequest(async () => {
    const res = await feeRequest.deleteMany(ids)
    table.resetRowSelection()
    return res
  })
  return (
    <div className='flex items-center gap-x-3 py-4'>
      <SearchForm placeholder='Nhập tên khoản thu hoặc mô tả' className='w-[300px]' />
      <FeeFilter />
      <TableViewOptions className='ms-auto' table={table} />
      <Link passHref href='/dashboard/fee/create'>
        <Button>Thêm mới</Button>
      </Link>
      <Button variant='destructive' disabled={ids.length === 0} onClick={handleDeleteMany}>
        Xóa nhiều
      </Button>
    </div>
  )
}
