'use client'

import { CustomTable } from '@/components/table-helpper'
import { PaginateCitizen } from '@/services/types/citizen.dto'
import { citizenDataColumns } from './citizen.column'
import { CitizenTableToolbar } from './citizen.toolbar'

export const CitizenTable = ({ data }: { data: PaginateCitizen }) => (
  <CustomTable
    data={data}
    columns={citizenDataColumns}
    toolbar={(table) => <CitizenTableToolbar table={table} />}
  />
)
