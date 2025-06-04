import { SearchForm } from '@/components/common/search-form'
import { TableViewOptions } from '@/components/table-helpper'
import { Button } from '@/components/ui/button'
import { useRequest } from '@/hooks/use-request'
import { cn } from '@/lib/utils'
import { householdRequest } from '@/services/routes/household.request'
import { HouseholdIncludeCitizen } from '@/services/types/household.dto'
import { Table } from '@tanstack/react-table'
import Link from 'next/link'
import { Fragment } from 'react'

interface TableControlProps {
  table: Table<HouseholdIncludeCitizen>
  ids: string[]
  isViewOnly?: boolean
}
export const HouseholdTableToolbar = ({ table, ids, isViewOnly }: TableControlProps) => {
  const handleDeleteMany = useRequest(async () => {
    const res = await householdRequest.deleteMany(ids)
    table.resetRowSelection()
    return res
  })
  return (
    <div className='flex items-center gap-x-3 py-4'>
      <SearchForm
        placeholder='Nhập mã căn hộ, số phòng hoặc địa chỉ, ....'
        className={cn('w-[400px]', isViewOnly && 'w-full')}
      />
      {!isViewOnly && (
        <Fragment>
          <TableViewOptions className='ms-auto' table={table} />
          <Link passHref href='/dashboard/household/create'>
            <Button>Thêm mới</Button>
          </Link>
          <Button onClick={handleDeleteMany} variant='destructive' disabled={ids.length === 0}>
            Xóa
          </Button>
        </Fragment>
      )}
    </div>
  )
}
