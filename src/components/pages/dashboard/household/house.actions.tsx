import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRequest } from '@/hooks/use-request'
import { householdRequest } from '@/services/routes/household.request'
import { HouseholdIncludeCitizen } from '@/services/types/household.dto'
import {
  Copy,
  Ellipsis,
  Eye,
  History,
  Home,
  Pencil,
  Trash2,
  UserCheck,
  UserPlus,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { ViewHouseholdDialog } from './view-household-dialog'

export const HouseholdActions = ({ household }: { household: HouseholdIncludeCitizen }) => {
  const handleDelete = useRequest(async (id: string) => householdRequest.delete(id))
  const [open, setOpen] = useState(false)
  return (
    <Fragment>
      <ViewHouseholdDialog open={open} onClose={() => setOpen(false)} household={household} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <Ellipsis className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Hành động</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Eye className='mr-2 h-4 w-4' />
            Xem chi tiết
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(household.id)}>
            <Copy className='mr-2 h-4 w-4' />
            Copy household ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <Link passHref href={`/dashboard/household/${household.id}/edit`} legacyBehavior>
            <DropdownMenuItem>
              <Pencil className='mr-2 h-4 w-4' />
              Chỉnh sửa
            </DropdownMenuItem>
          </Link>
          <Link passHref href={`/dashboard/household/${household.id}/profile`} legacyBehavior>
            <DropdownMenuItem>
              <Home className='mr-2 h-4 w-4' />
              Thông tin
            </DropdownMenuItem>
          </Link>
          <Link passHref href={`/dashboard/household/${household.id}/member`} legacyBehavior>
            <DropdownMenuItem>
              <Users className='mr-2 h-4 w-4' />
              Thành viên
            </DropdownMenuItem>
          </Link>
          <Link passHref href={`/dashboard/household/${household.id}/history`} legacyBehavior>
            <DropdownMenuItem>
              <History className='mr-2 h-4 w-4' />
              Lịch sử thay đổi
            </DropdownMenuItem>
          </Link>
          <Link
            passHref
            href={`/dashboard/household/${household.id}/change-head-household`}
            legacyBehavior
          >
            <DropdownMenuItem>
              <UserCheck className='mr-2 h-4 w-4' />
              Thay đổi chủ hộ
            </DropdownMenuItem>
          </Link>
          <Link passHref href={`/dashboard/household/${household.id}/add-member`} legacyBehavior>
            <DropdownMenuItem>
              <UserPlus className='mr-2 h-4 w-4' />
              Thêm thành viên
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => handleDelete(household.id)}>
            <Trash2 className='mr-2 h-4 w-4' />
            Xóa dữ liệu
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Fragment>
  )
}
