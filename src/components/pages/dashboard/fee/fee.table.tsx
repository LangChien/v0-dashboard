'use client'

import { CustomTable } from '@/components/table-helpper'
import { PaginateFee } from '@/services/types/fee.dto'
import { feeDataColumns } from './fee.column'
import { FeeActionToolbar } from './fee.toolbar'

export const FeeTable = ({ data }: { data: PaginateFee }) => (
  <CustomTable
    data={data}
    columns={feeDataColumns}
    toolbar={(table) => <FeeActionToolbar table={table} />}
  />
)
