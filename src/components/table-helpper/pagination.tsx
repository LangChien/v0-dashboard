import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PaginateMeta } from '@/services/crud/crud.generic'
import { Table } from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const PAGE_SIZE_OPTION_DEFAULT = [5, 8, 10, 15, 20, 25]

export const TablePagination = <TData,>(props: {
  table?: Table<TData>
  meta: PaginateMeta
  pageSizeOptions?: number[]
}) => {
  const { table, meta, pageSizeOptions } = props
  const _pageSizeOptions = pageSizeOptions || PAGE_SIZE_OPTION_DEFAULT
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // change limit to url and reset page to 1
  const handlePageSizeChange = (pageSize: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('limit', pageSize.toString())
    params.set('page', '1')
    replace(`${pathname}?${params}`)
  }
  // change page to url
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    replace(`${pathname}?${params}`, { scroll: false })
  }

  return (
    <div className='flex items-center justify-between px-2 py-4'>
      {table && (
        <div className='flex-1 text-sm text-muted-foreground'>
          {'Đã chọn ' + table.getFilteredSelectedRowModel().rows.length} bản ghi trong tổng{' '}
          {meta.totalItem} bản ghi
        </div>
      )}
      <div className='flex items-center space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-2'>
          <p className='text-sm font-medium'>Số bản ghi trên 1 trang</p>
          <Select value={meta.limit.toString()} onValueChange={handlePageSizeChange}>
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={meta.limit} />
            </SelectTrigger>
            <SelectContent side='top'>
              {_pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
          Trang {meta.page} / {meta.totalPage}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => handlePageChange(1)}
            disabled={meta.page === 1}
          >
            <span className='sr-only'>Đi tới trang đầu</span>
            <ChevronsLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => handlePageChange(meta.page - 1)}
            disabled={meta.page === 1}
          >
            <span className='sr-only'>Đi tới trang trước</span>
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => handlePageChange(meta.page + 1)}
            disabled={meta.page === meta.totalPage}
          >
            <span className='sr-only'>Đi tới trang tiếp theo</span>
            <ChevronRight className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => handlePageChange(meta.totalPage)}
            disabled={meta.page === meta.totalPage}
          >
            <span className='sr-only'>Đi tới trang cuối</span>
            <ChevronsRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export const Pagination = (props: { meta: PaginateMeta; pageSizeOptions?: number[] }) => {
  const { meta, pageSizeOptions } = props
  const _pageSizeOptions = pageSizeOptions || PAGE_SIZE_OPTION_DEFAULT
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // change limit to url and reset page to 1
  const handlePageSizeChange = (pageSize: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('limit', pageSize.toString())
    params.set('page', '1')
    replace(`${pathname}?${params}`)
  }
  // change page to url
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    replace(`${pathname}?${params}`, { scroll: false })
  }

  return (
    <div className='flex items-center justify-between px-2 py-4'>
      <div className='flex items-center space-x-2'>
        <p className='text-sm font-medium'>Giới hạn</p>
        <Select value={meta.limit.toString()} onValueChange={handlePageSizeChange}>
          <SelectTrigger className='h-8 w-[70px]'>
            <SelectValue placeholder={meta.limit} />
          </SelectTrigger>
          <SelectContent side='top'>
            {_pageSizeOptions.map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
        Trang {meta.page} / {meta.totalPage}
      </div>
      <div className='flex items-center space-x-2'>
        <Button
          variant='outline'
          className='hidden h-8 w-8 p-0 lg:flex'
          onClick={() => handlePageChange(1)}
          disabled={meta.page === 1}
        >
          <span className='sr-only'>Đi tới trang đầu</span>
          <ChevronsLeft className='h-4 w-4' />
        </Button>
        <Button
          variant='outline'
          className='h-8 w-8 p-0'
          onClick={() => handlePageChange(meta.page - 1)}
          disabled={meta.page === 1}
        >
          <span className='sr-only'>Đi tới trang trước</span>
          <ChevronLeft className='h-4 w-4' />
        </Button>
        <Button
          variant='outline'
          className='h-8 w-8 p-0'
          onClick={() => handlePageChange(meta.page + 1)}
          disabled={meta.page === meta.totalPage}
        >
          <span className='sr-only'>Đi tới trang tiếp theo</span>
          <ChevronRight className='h-4 w-4' />
        </Button>
        <Button
          variant='outline'
          className='hidden h-8 w-8 p-0 lg:flex'
          onClick={() => handlePageChange(meta.totalPage)}
          disabled={meta.page === meta.totalPage}
        >
          <span className='sr-only'>Đi tới trang cuối</span>
          <ChevronsRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}
