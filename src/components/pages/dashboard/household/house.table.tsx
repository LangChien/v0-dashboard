'use client'

import { VisibilityState, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import * as React from 'react'

import { TablePagination } from '@/components/table-helpper'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Card } from '@/components/ui/card'
import { getSelectedRow } from '@/lib/utils'
import { PaginateHousehold } from '@/services/types/household.dto'
import { baseHouseholdColumns, householdColumns } from './house.column'
import { HouseholdTableToolbar } from './house.toolbar'

interface HouseholdTableProps {
  data: PaginateHousehold
  isViewOnly?: boolean
}

export const HouseholdTable = ({ data, isViewOnly }: HouseholdTableProps) => {
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const table = useReactTable({
    data: data.result,
    columns: isViewOnly ? baseHouseholdColumns : householdColumns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <Card className='w-full px-5'>
      <HouseholdTableToolbar
        ids={getSelectedRow(rowSelection, data.result).map((item) => item.id)}
        table={table}
        isViewOnly={isViewOnly}
      />
      <Table>
        <TableHeader>
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
        <TableBody>
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
            <TableRow>
              <TableCell colSpan={householdColumns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination table={table} meta={data.meta} />
    </Card>
  )
}
