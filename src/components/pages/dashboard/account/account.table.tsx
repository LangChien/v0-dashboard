'use client'

import { CustomTable } from '@/components/table-helpper'
import { PaginateUser } from '@/services/types/user.dto'
import { userColumns } from './account.column'
import { UserToolbar } from './account.toolbar'

export const UserTable = ({ data }: { data: PaginateUser }) => (
  <CustomTable
    data={data}
    columns={userColumns}
    toolbar={(table) => <UserToolbar table={table} />}
  />
)
