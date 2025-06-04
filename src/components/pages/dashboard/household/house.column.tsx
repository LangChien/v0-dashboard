import { ColumnDef } from '@tanstack/react-table'

import { UUIDComp } from '@/components/common/uuid-comp'
import { ColumnHeader } from '@/components/table-helpper'
import { Checkbox } from '@/components/ui/checkbox'
import { formatDateTimestamp } from '@/lib/utils'
import { HouseholdIncludeCitizen } from '@/services/types/household.dto'
import { HouseholdActions } from './house.actions'

export const baseHouseholdColumns: ColumnDef<HouseholdIncludeCitizen>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'Mã căn hộ',
    accessorKey: 'id',
    header: ({ column }) => <ColumnHeader column={column} title='Mã căn hộ' columnName='id' />,
    cell: ({ row }) => <UUIDComp id={row.original.id} />,
  },
  {
    id: 'Sô phòng',
    accessorKey: 'houseNumber',
    header: ({ column }) => (
      <ColumnHeader column={column} title='Số phòng' columnName='houseNumber' />
    ),
    cell: ({ row }) => <div>{row.original.houseNumber}</div>,
  },
  {
    id: 'Địa chỉ',
    accessorKey: 'address',
    header: ({ column }) => <ColumnHeader column={column} title='Địa chỉ' columnName='address' />,
    cell: ({ row }) => <div>{row.original.address}</div>,
  },
  {
    id: 'Chủ hộ',
    accessorKey: 'headCitizen',
    header: 'Chủ hộ',
    cell: ({ row }) => {
      const headCitizen = row.original.headCitizen
      if (!headCitizen) return <div>Chưa có thông tin</div>
      return <div>{headCitizen.fullName}</div>
    },
  },
  {
    id: 'Số thành viên',
    accessorKey: '_count.members',
    header: 'Sô thành viên',
    cell: ({ row }) => {
      const household = row.original
      return <div className='text-center'>{household._count.members}</div>
    },
  },
]

export const householdColumns: ColumnDef<HouseholdIncludeCitizen>[] = [
  ...baseHouseholdColumns,
  {
    id: 'Ngày tạo',
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <ColumnHeader column={column} title='Ngày tạo' columnName='createdAt' />
    ),
    cell: ({ row }) => {
      const original = row.original
      return <div>{formatDateTimestamp(original.createdAt)}</div>
    },
  },
  {
    id: 'Ngày cập nhật',
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <ColumnHeader column={column} title='Ngày cập nhật' columnName='updatedAt' />
    ),
    cell: ({ row }) => {
      const original = row.original
      return <div>{formatDateTimestamp(original.updatedAt)}</div>
    },
  },
  {
    id: 'Hành động',
    enableHiding: false,
    cell: ({ row }) => {
      const household = row.original
      return <HouseholdActions household={household} />
    },
  },
]
