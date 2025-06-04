import { SearchForm } from '@/components/common/search-form'
import { FieldFilter, TableViewOptions } from '@/components/table-helpper'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useQueryManager } from '@/hooks/query/use-query-manager'
import { useRequest } from '@/hooks/use-request'
import { accountRequest } from '@/services/routes/account.request'
import { USER_ROLE, USER_STATUS } from '@/services/schemas/user.schema'
import { User } from '@/services/types/user.dto'
import { Table } from '@tanstack/react-table'
import { UserPlus } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import { UserRoleBabge, UserStatusBabge } from './account.enum'

export const UserToolbar: FC<{
  table: Table<User>
}> = ({ table }) => {
  const ids = table.getSelectedRowModel().flatRows.map((row) => row.original.id)
  const handleDeleteMany = useRequest(async () => {
    const res = await accountRequest.deleteMany(ids)
    table.resetRowSelection()
    return res
  })
  const queryManager = useQueryManager()

  return (
    <div className='flex items-center gap-x-3 py-4'>
      <SearchForm
        placeholder='Nhập tên hoặc email người dùng'
        className='w-[300px]'
        queryManager={queryManager}
      />
      <FieldFilter
        fieldName='role'
        title='Vai trò'
        options={Object.values(USER_ROLE).map((role) => ({
          label: <UserRoleBabge role={role} />,
          value: role,
        }))}
        queryManager={queryManager}
      />
      <FieldFilter
        fieldName='status'
        title='Trạng thái'
        options={Object.values(USER_STATUS).map((status) => ({
          label: <UserStatusBabge status={status} />,
          value: status,
        }))}
        queryManager={queryManager}
      />
      <TableViewOptions className='ms-auto' table={table} />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link passHref href='/dashboard/account/create'>
              <Button>
                <UserPlus />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>Thêm người dùng mới</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Button onClick={handleDeleteMany} variant='destructive' disabled={ids.length === 0}>
        Xóa
      </Button>
    </div>
  )
}
