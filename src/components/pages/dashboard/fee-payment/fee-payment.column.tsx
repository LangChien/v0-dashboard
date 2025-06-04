import { UUIDComp } from '@/components/common/uuid-comp'
import { ColumnHeader } from '@/components/table-helpper'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useRequest } from '@/hooks/use-request'
import { cn, formatDateTimestamp, formatPrice } from '@/lib/utils'
import { paymentRequest } from '@/services/routes/payment.request'
import { PaymentIncludeHouseholdAndCitizen } from '@/services/types/payment.dto'
import { ColumnDef, Row } from '@tanstack/react-table'
import { Pencil, Trash } from 'lucide-react'
import Link from 'next/link'

export const paymentDataColumns: ColumnDef<PaymentIncludeHouseholdAndCitizen>[] = [
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
    id: 'Mã giao dịch',
    accessorKey: 'id',
    header: ({ column }) => <ColumnHeader column={column} title='Mã giao dịch' columnName='id' />,
    cell: ({ row }) => <UUIDComp id={row.original.id} />,
  },
  {
    id: 'Tên khoản thu',
    accessorKey: 'fee.name',
    header: ({ column }) => (
      <ColumnHeader column={column} title='Tên khoản thu' columnName='fee.name' />
    ),
    cell: ({ row }) => <div>{row.original.fee.name}</div>,
  },
  {
    id: 'Người nộp',
    accessorKey: 'payerName',
    header: ({ column }) => (
      <ColumnHeader column={column} title='Người nộp' columnName='payerName' />
    ),
    cell: ({ row }) => <div>{row.original.payerName}</div>,
  },
  {
    id: 'Mã phòng căn hộ nộp',
    accessorKey: 'payerName',
    header: ({ column }) => (
      <ColumnHeader column={column} title='Căn hộ nộp' columnName='payerName' />
    ),
    cell: ({ row }) => <div className='text-center'>{row.original.household.houseNumber}</div>,
  },
  {
    id: 'Số tiền nạp',
    accessorKey: 'amount',
    header: ({ column }) => (
      <ColumnHeader column={column} title='Số tiền nạp' columnName='amount' />
    ),
    cell: ({ row }) => (
      <div
        className={cn(
          'font-bold',
          row.original.amount >= row.original.fee.amount ? 'text-green-500' : 'text-red-500',
          !row.original.fee.isMandatory && 'text-gray-500',
        )}
      >
        {formatPrice(row.original.amount)}
      </div>
    ),
  },
  {
    id: 'Số tiền yêu cầu',
    accessorKey: 'fee.amount',
    header: ({ column }) => (
      <ColumnHeader column={column} title='Số tiền yêu cầu' columnName='fee.amount' />
    ),
    cell: ({ row }) => (
      <div className='font-bold'>
        {formatPrice(row.original.fee.isMandatory ? row.original.fee.amount : 0)}
      </div>
    ),
  },
  {
    id: 'Ngày nộp',
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <ColumnHeader column={column} title='Ngày nộp' columnName='createdAt' />
    ),
    cell: ({ row }) => <div>{formatDateTimestamp(row.original.createdAt)}</div>,
  },
  {
    id: 'Ngày cập nhật',
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <ColumnHeader column={column} title='Ngày cập nhật' columnName='updatedAt' />
    ),
    cell: ({ row }) => <div>{formatDateTimestamp(row.original.updatedAt)}</div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <Actions row={row} />,
    header: 'Thao tác',
  },
]

const Actions = ({ row }: { row: Row<PaymentIncludeHouseholdAndCitizen> }) => {
  const useDelete = useRequest(() => paymentRequest.delete(row.original.id))
  return (
    <div className='flex items-center gap-2'>
      <Link passHref href={`/dashboard/fee/payment/${row.original.id}/edit`}>
        <Button className='text-blue-500' variant='link'>
          <Pencil />
        </Button>
      </Link>
      <Button onClick={useDelete} variant='link' className='text-red-500'>
        <Trash />
      </Button>
    </div>
  )
}
