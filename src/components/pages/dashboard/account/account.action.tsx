import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useRequest } from '@/hooks/use-request'
import { accountRequest } from '@/services/routes/account.request'
import { USER_ROLE, USER_STATUS } from '@/services/schemas/user.schema'
import { User } from '@/services/types/user.dto'
import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog'
import { BrushCleaning, Copy, Ellipsis, Eye, Lock, LockOpen, Pencil } from 'lucide-react'
import Link from 'next/link'
import { FC, Fragment, useState } from 'react'
import { UserRoleBabge } from './account.enum'
import { ViewAccountDialog } from './view-account-dialog'

export const UserAction: FC<{ user: User }> = ({ user }) => {
  const handleUpdate: (status: USER_STATUS) => void = useRequest(async (status: USER_STATUS) =>
    accountRequest.update(user.id, { status }),
  )
  const handleDelete = useRequest(async () => accountRequest.delete(user.id))
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  return (
    <Fragment>
      <ViewAccountDialog open={open} onClose={() => setOpen(false)} user={user} />
      <DeleteUserDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        handleDelete={handleDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <Ellipsis className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Eye className='mr-2 h-4 w-4' />
            Xem chi tiết
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
            <Copy className='mr-2 h-4 w-4 text-gray-500' />
            Copy account ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <Link passHref href={`/dashboard/account/${user.id}/edit`} legacyBehavior>
            <DropdownMenuItem>
              <Pencil className='mr-2 h-4 w-4 text-yellow-500' />
              Cập nhật
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => setOpenDelete(true)}>
            <BrushCleaning className='mr-2 h-4 w-4 text-red-500' />
            Vô hiệu hóa tài khoản
          </DropdownMenuItem>
          {user.status !== USER_STATUS.BLOCKED ? (
            <DropdownMenuItem onClick={() => handleUpdate(USER_STATUS.BLOCKED)}>
              <Lock className='mr-2 h-4 w-4 text-blue-500' />
              Khóa tài khoản
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => handleUpdate(USER_STATUS.ACTIVE)}>
              <LockOpen className='mr-2 h-4 w-4 text-green-500' />
              Mở khóa tài khoản
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </Fragment>
  )
}
export const ChangeRole: FC<{ user: User }> = ({ user }) => {
  const handleChangeRole: (role: USER_ROLE) => void = useRequest(async (role: USER_ROLE) =>
    accountRequest.changeRole(user.id, { role }),
  )
  return (
    <Select
      disabled={user.role === USER_ROLE.SYSTEM_ADMIN}
      value={user.role}
      onValueChange={(v) => handleChangeRole(v as USER_ROLE)}
    >
      <SelectTrigger>
        <SelectValue placeholder='Thay đổi vai trò' />
      </SelectTrigger>
      <SelectContent>
        {Object.values(USER_ROLE).map((role) => (
          <SelectItem disabled={role === USER_ROLE.SYSTEM_ADMIN} value={role} key={`role-${role}`}>
            <UserRoleBabge className='flex-1' role={role} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export const DeleteUserDialog = ({
  open,
  onClose,
  handleDelete,
}: {
  open: boolean
  onClose: () => void
  handleDelete: () => void
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogTrigger className='hidden'>Click</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn chắc chắn chứ?</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn xóa tài khoản này? Đây là thao tác xóa mềm, tài khoản sẽ bị vô
            hiệu hóa và có thể khôi phục lại.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Hủy bỏ</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleDelete()
              onClose()
            }}
          >
            Xóa mềm (Vô hiệu hóa)
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
