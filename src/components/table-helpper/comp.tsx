'use client'
import {
  TableBody,
  TableCell,
  Table as TableComp,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useTable } from '@/hooks/use-table'
import { cn } from '@/lib/utils'
import { Paginate, PaginateMeta } from '@/services/crud/crud.generic'
import { ColumnDef, flexRender, Table } from '@tanstack/react-table'
import { ReactNode } from 'react'
import { Card } from '../ui/card'
import { TablePagination } from './pagination'

interface BaseEntity {
  id: string
}

export const RowNoResult = (props: { colSpan: number; message?: string }) => {
  const { colSpan, message } = props
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className='h-24 text-center'>
        {message ?? 'Không tìm thấy bản ghi nào'}
      </TableCell>
    </TableRow>
  )
}

export const CustomTableHeader = <T extends BaseEntity>(props: {
  table: Table<T>
  className?: string
}) => {
  const { table, className } = props
  return (
    <TableHeader className={className}>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            )
          })}
        </TableRow>
      ))}
    </TableHeader>
  )
}

export const CustomTableBody = <T extends BaseEntity>(props: {
  table: Table<T>
  className?: string
}) => {
  const { table, className } = props
  return (
    <TableBody className={className}>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <RowNoResult colSpan={table.getAllColumns().length} />
      )}
    </TableBody>
  )
}

export const CustomTableComp = <T extends BaseEntity>(props: {
  table: Table<T>
  meta: PaginateMeta
  className?: string
  toolbar?: (table: Table<T>) => ReactNode
}) => {
  const { table, className, toolbar, meta } = props
  return (
    <Card className={cn('w-full px-5', className)}>
      {toolbar && toolbar(table)}
      <TableComp>
        <CustomTableHeader table={table} />
        <CustomTableBody table={table} />
      </TableComp>
      <TablePagination table={table} meta={meta} />
    </Card>
  )
}

export const CustomTable = <T extends BaseEntity>(props: {
  data: Paginate<T>
  columns: ColumnDef<T>[]
  toolbar?: (table: Table<T>) => ReactNode
}) => {
  const { data, columns, toolbar } = props
  const { table } = useTable({
    columns,
    data: data.result,
  })
  return <CustomTableComp meta={data.meta} table={table} toolbar={toolbar} />
}
