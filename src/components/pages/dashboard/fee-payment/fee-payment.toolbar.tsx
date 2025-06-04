import { SearchForm } from '@/components/common/search-form'
import { FilterDate } from '@/components/filter/filter-date'
import { TableViewOptions } from '@/components/table-helpper'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Filter } from '@/hooks/query/common'
import { useQueryBetween } from '@/hooks/query/use-query-between'
import { useQueryManager } from '@/hooks/query/use-query-manager'
import { useRequest } from '@/hooks/use-request'
import { feeRequest } from '@/services/routes/fee.request'
import { Table } from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export const PaymentActionToolbar = <T extends { id: string }>({ table }: { table: Table<T> }) => {
  const ids = table.getSelectedRowModel().flatRows.map((row) => row.original.id)
  const handleDeleteMany = useRequest(async () => {
    const res = await feeRequest.deleteMany(ids)
    table.resetRowSelection()
    return res
  })
  const queryManager = useQueryManager()
  const paymentDateQuery = useQueryBetween<Date>('createdAt', queryManager)
  const amountQuery = useQueryBetween<Date>('amount', queryManager)

  const handleSubmit = () => {
    const filter: Filter<any> = {
      createdAt: {
        gte: paymentDateQuery.from,
        lte: paymentDateQuery.to,
      },
    }
    queryManager.updateParam('filter', JSON.stringify(filter))
  }
  const handleClear = () => {
    queryManager.updateParam('filter')
    queryManager.updateParam('page')
    queryManager.updateParam('search')
  }
  return (
    <div className='pt-5'>
      <FilterDate title='Ngày giao dịch' query={paymentDateQuery} />

      <SearchForm
        queryManager={queryManager}
        placeholder='Nhập mã khoản thu, mã căn hộ, hoặc nội dung giao dịch'
        className='w-full'
      />
      <div className='flex items-center gap-3 py-4'>
        <Button onClick={handleSubmit} className='ms-auto'>
          Tìm kiếm
        </Button>
        <Button disabled={ids.length === 0} onClick={handleDeleteMany} variant='destructive'>
          Xoá
        </Button>
        <TableViewOptions table={table} />
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              className='fixed bottom-6 right-6 z-10'
              passHref
              href='/dashboard/fee/payment/create'
            >
              <Button size='icon' className='rounded-full size-16'>
                <Plus size={48} className='w-12 h-12' />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Thêm khoản thu mới</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
