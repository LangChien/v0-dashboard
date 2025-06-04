import { UUIDComp } from '@/components/common/uuid-comp'
import { ColumnHeader } from '@/components/table-helpper'
import { Checkbox } from '@/components/ui/checkbox'
import { GENDER_LABELS } from '@/services/enum-label'
import { GENDER } from '@/services/schemas/citizen.schema'
import { Citizen } from '@/services/types/citizen.dto'
import { ColumnDef } from '@tanstack/react-table'
import { formatDate } from 'date-fns'
import { CitizenActions } from './citizen.actions'

export const citizenDataColumns: ColumnDef<Citizen>[] = [
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
    cell: ({ row }) => <div>{row.original.fullName}</div>,
  },
  {
    id: 'Ngày sinh',
    accessorKey: 'dateOfBirth',
    header: ({ column }) => (
      <ColumnHeader column={column} title='Ngày sinh' columnName='dateOfBirth' />
    ),
    cell: ({ row }) => <div>{formatDate(row.original.dateOfBirth, 'dd/MM/yyy')}</div>,
  },
  {
    id: 'Giới tính',
    accessorKey: 'gender',
    header: ({ column }) => <ColumnHeader column={column} title='Giới tính' columnName='gender' />,
    cell: ({ row }) => <div>{GENDER_LABELS[row.original.gender as GENDER]}</div>,
  },
  {
    id: 'Tuổi',
    accessorKey: 'age',
    header: ({ column }) => <ColumnHeader column={column} title='Tuổi' columnName='age' />,
    cell: ({ row }) => <div>{row.original.age}</div>,
  },
  // {
  //   id: 'Dân tộc',
  //   accessorKey: 'ethnicity',
  //   header: ({ column }) => <ColumnHeader column={column} title='Dân tộc' columnName='ethnicity' />,
  //   cell: ({ row }) => <div>{row.original.ethnicity}</div>,
  // },
  // {
  //   id: 'Tôn giáo',
  //   accessorKey: 'religion',
  //   header: ({ column }) => <ColumnHeader column={column} title='Tôn giáo' columnName='religion' />,
  //   cell: ({ row }) => <div>{row.original.religion}</div>,
  // },
  {
    id: 'Số CMND/CCCD',
    accessorKey: 'nationalId',
    header: ({ column }) => (
      <ColumnHeader column={column} title='Số CMND/CCCD' columnName='nationalId' />
    ),
    cell: ({ row }) => <div>{row.original.nationalId}</div>,
  },
  // {
  //   id: 'Ngày cấp',
  //   accessorKey: 'issueDate',
  //   header: ({ column }) => (
  //     <ColumnHeader column={column} title='Ngày cấp' columnName='issueDate' />
  //   ),
  //   cell: ({ row }) => <div>{formatDate(row.original.issueDate, 'dd/MM/yyy')}</div>,
  // },
  // {
  //   id: 'Nơi cấp',
  //   accessorKey: 'issuePlace',
  //   header: ({ column }) => (
  //     <ColumnHeader column={column} title='Nơi cấp' columnName='issuePlace' />
  //   ),
  //   cell: ({ row }) => <div>{row.original.issuePlace}</div>,
  // },
  {
    id: 'Nghề nghiệp',
    accessorKey: 'occupation',
    header: ({ column }) => (
      <ColumnHeader column={column} title='Nghề nghiệp' columnName='occupation' />
    ),
    cell: ({ row }) => <div>{row.original.occupation}</div>,
  },
  {
    id: 'Ngày tạo',
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <div className='hidden xl:table-cell'>
        <ColumnHeader column={column} title='Ngày tạo' columnName='createdAt' />
      </div>
    ),
    cell: ({ row }) => (
      <div className='hidden xl:table-cell'>
        {row.original.createdAt ? formatDate(row.original.createdAt, 'dd/MM/yyy') : ''}
      </div>
    ),
  },
  {
    id: 'Ngày cập nhật',
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <div className='hidden xl:table-cell'>
        <ColumnHeader column={column} title='Ngày cập nhật' columnName='updatedAt' />
      </div>
    ),
    cell: ({ row }) => (
      <div className='hidden xl:table-cell'>
        {row.original.updatedAt ? formatDate(row.original.updatedAt, 'dd/MM/yyy') : ''}
      </div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const citizen = row.original
      return <CitizenActions citizen={citizen} />
    },
  },
]
