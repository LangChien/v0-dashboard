import { ColumnDef, VisibilityState, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import * as React from 'react'

export const useTable = <T>({ columns, data }: { columns: ColumnDef<T>[]; data: T[] }) => {
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnVisibility,
      rowSelection,
    },
  })
  return { table, columnVisibility, setColumnVisibility, rowSelection, setRowSelection }
}
