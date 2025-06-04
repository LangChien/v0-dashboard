import { UUIDComp } from '@/components/common/uuid-comp'
import { ColumnHeader } from '@/components/table-helpper'
import { Checkbox } from '@/components/ui/checkbox'
import { formatDateTimestamp } from '@/lib/utils'
import { USER_STATUS } from '@/services/schemas/user.schema'
import { User } from '@/services/types/user.dto'
import { ColumnDef } from '@tanstack/react-table'
import { ChangeRole, UserAction } from './account.action'
import { UserStatusBabge } from './account.enum'

export const userColumns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Chọn tất cả'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Chọn hàng'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'Mã công dân',
    accessorKey: 'id',
    header: ({ column }) => <ColumnHeader column={column} title='Mã công dân' columnName='id' />,
    cell: ({ row }) => <UUIDComp id={row.original.id} />,
  },
  {
    id: 'Họ và tên',
    accessorKey: 'fullName',
    header: ({ column }) => (
      <ColumnHeader column={column} title='Họ và tên' columnName='fullName' />
    ),
    cell: ({ row }) => <div className='capitalize'>{row.original.fullName}</div>,
  },
  {
    id: 'Email',
    accessorKey: 'email',
    header: ({ column }) => <ColumnHeader column={column} title='Email' columnName='email' />,
    cell: ({ row }) => <div>{row.original.email}</div>,
  },
  {
    id: 'Trạng thái',
    accessorKey: 'status',
    header: ({ column }) => <ColumnHeader column={column} title='Trạng thái' columnName='status' />,
    cell: ({ row }) => <UserStatusBabge status={row.original.status as USER_STATUS} />,
  },
  {
    id: 'Ngày tạo',
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <div className='hidden 2xl:table-cell'>
        <ColumnHeader column={column} title='Ngày tạo' columnName='createdAt' />
      </div>
    ),
    cell: ({ row }) => {
      const original = row.original
      const createdAt = original.createdAt
      return <div className='hidden 2xl:table-cell'>{formatDateTimestamp(createdAt)}</div>
    },
  },
  {
    id: 'Ngày cập nhật',
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <div className='hidden 2xl:table-cell'>
        <ColumnHeader column={column} title='Ngày cập nhật' columnName='updatedAt' />
      </div>
    ),
    cell: ({ row }) => {
      const original = row.original
      const updatedAt = original.updatedAt
      return <div className='hidden 2xl:table-cell'>{formatDateTimestamp(updatedAt)}</div>
    },
  },
  {
    id: 'Đăng nhập cuối',
    accessorKey: 'lastLogin',
    header: ({ column }) => (
      <ColumnHeader column={column} title='Đăng nhập cuối' columnName='lastLogin' />
    ),
    cell: ({ row }) => {
      const original = row.original
      const lastLogin = original.lastLogin
      return <div>{lastLogin ? formatDateTimestamp(lastLogin) : 'Chưa đăng nhập'}</div>
    },
  },
  {
    id: 'Vai trò',
    accessorKey: 'role',
    header: ({ column }) => <ColumnHeader column={column} title='Vai trò' columnName='role' />,
    cell: ({ row }) => {
      const user = row.original
      return <ChangeRole user={user} />
    },
  },
  {
    id: 'Hành động',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original
      return <UserAction user={user} />
    },
  },
]
