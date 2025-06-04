import { UUIDComp } from '@/components/common/uuid-comp'
import { ColumnHeader } from '@/components/table-helpper'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { formatPrice } from '@/lib/utils'
import { FEE_STATUS_COLORS, FEE_STATUS_LABELS } from '@/services/enum-label'
import { FEE_STATUS } from '@/services/schemas/fee.schema'
import { FeeInludeCount } from '@/services/types/fee.dto'
import { ColumnDef } from '@tanstack/react-table'
import { formatDate } from 'date-fns'
import { FeeActions } from './fee.actions'

export const feeDataColumns: ColumnDef<FeeInludeCount>[] = [
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
    id: 'Mã khoản thu',
    accessorKey: 'id',
    header: ({ column }) => <ColumnHeader column={column} title='Mã khoản thu' columnName='id' />,
    cell: ({ row }) => <UUIDComp id={row.original.id} />,
  },
  {
    id: 'Tên khoản thu',
    accessorKey: 'name',
    header: ({ column }) => (
      <ColumnHeader column={column} title='Tên khoản thu' columnName='name' />
    ),
    cell: ({ row }) => row.original.name,
  },
  {
    id: 'Số tiền',
    accessorKey: 'amount',
    header: ({ column }) => <ColumnHeader column={column} title='Số tiền' columnName='amount' />,
    cell: ({ row }) => formatPrice(row.original.amount),
  },
  {
    id: 'Hạn nộp',
    accessorKey: 'dueDate',
    header: ({ column }) => <ColumnHeader column={column} title='Hạn nộp' columnName='dueDate' />,
    cell: ({ row }) => formatDate(row.original.dueDate, 'dd/MM/yyyy'),
  },
  {
    id: 'Mô tả',
    accessorKey: 'description',
    header: ({ column }) => <ColumnHeader column={column} title='Mô tả' columnName='description' />,
    cell: ({ row }) => row.original.description,
  },
  {
    id: 'Trạng thái',
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => <FeeStatusLabel status={row.original.status} />,
  },
  {
    id: 'Bắt buộc',
    accessorKey: 'isMandatory',
    header: 'Bắt buộc',
    cell: ({ row }) => <FeeMandatoryLabel isMandatory={row.original.isMandatory} />,
  },
  {
    id: 'Căn hộ',
    accessorKey: 'Căn hộ',
    header: ({ column }) => <ColumnHeader column={column} title='Căn hộ' columnName='Căn hộ' />,
    cell: ({ row }) => {
      const original = row.original
      return original._count.payments + '/' + original.totalHouseholds
    },
  },
  {
    id: 'Ngày tạo',
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <ColumnHeader column={column} title='Ngày tạo' columnName='createdAt' />
    ),
    cell: ({ row }) => formatDate(row.original.createdAt, 'dd/MM/yyyy'),
  },
  {
    id: 'Ngày cập nhật',
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <ColumnHeader column={column} title='Ngày cập nhật' columnName='updatedAt' />
    ),
    cell: ({ row }) => formatDate(row.original.updatedAt, 'dd/MM/yyyy'),
  },
  {
    id: 'Hành động',
    enableHiding: false,
    cell: ({ row }) => {
      const fee = row.original
      return <FeeActions fee={fee} />
    },
  },
]

export const FeeMandatoryLabel = ({ isMandatory }: { isMandatory: boolean }) => {
  return (
    <Badge variant={isMandatory ? 'default' : 'secondary'}>
      {isMandatory ? 'Bắt buộc' : 'Tự nguyện'}
    </Badge>
  )
}

export const FeeStatusLabel = ({ status }: { status: FEE_STATUS }) => {
  return <Badge className={FEE_STATUS_COLORS[status]}>{FEE_STATUS_LABELS[status]}</Badge>
}
