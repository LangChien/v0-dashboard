'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/lib/utils'
import {
  USER_ROLE_COLORS,
  USER_ROLE_LABELS,
  USER_STATUS_COLORS,
  USER_STATUS_LABELS,
} from '@/services/enum-label'
import { User as UserType } from '@/services/types/user.dto'
import { Activity, Clock, Mail, Settings, Shield, User } from 'lucide-react'
import Link from 'next/link'

interface ViewAccountDialogProps {
  user: UserType
  open: boolean
  onClose: () => void
}

export const ViewAccountDialog = ({ user, open, onClose }: ViewAccountDialogProps) => {
  const formatDateTime = (date: Date | string | null) => {
    if (!date) return 'Chưa đăng nhập'
    return new Date(date).toLocaleString('vi-VN')
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[600px] max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <User className='h-5 w-5' />
            Thông tin tài khoản
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Profile Header */}
          <Card>
            <CardContent className='pt-6'>
              <div className='flex items-center gap-4'>
                <Avatar className='h-16 w-16'>
                  <AvatarImage src={user.avatar || undefined} alt={user.fullName} />
                  <AvatarFallback className='text-lg'>{user.fullName}</AvatarFallback>
                </Avatar>
                <div className='flex-1'>
                  <h3 className='text-xl font-semibold'>{user.fullName}</h3>
                  <p className='text-gray-600'>{user.email}</p>
                  <div className='flex items-center gap-2 mt-2'>
                    <Badge className={USER_ROLE_COLORS[user.role]}>
                      {USER_ROLE_LABELS[user.role]}
                    </Badge>
                    <Badge className={USER_STATUS_COLORS[user.status]}>
                      {USER_STATUS_LABELS[user.status]}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Details */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Settings className='h-4 w-4' />
                Chi tiết tài khoản
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-sm text-gray-600'>Họ</p>
                  <p className='font-semibold'>{user.lastName}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Tên</p>
                  <p className='font-semibold'>{user.firstName}</p>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <Mail className='h-4 w-4 text-blue-600' />
                <div>
                  <p className='text-sm text-gray-600'>Email</p>
                  <p className='font-semibold'>{user.email}</p>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <Shield className='h-4 w-4 text-purple-600' />
                <div>
                  <p className='text-sm text-gray-600'>Vai trò</p>
                  <p className='font-semibold'>{USER_ROLE_LABELS[user.role]}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Information */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Activity className='h-4 w-4' />
                Hoạt động
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center gap-2'>
                <Clock className='h-4 w-4 text-green-600' />
                <div>
                  <p className='text-sm text-gray-600'>Đăng nhập lần cuối</p>
                  <p className='font-semibold'>{formatDateTime(user.lastLogin)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* System Information */}
          <div className='grid grid-cols-2 gap-4 text-sm text-gray-600'>
            <div>
              <p className='font-medium'>Ngày tạo</p>
              <p>{formatDate(user.createdAt)}</p>
            </div>
            <div>
              <p className='font-medium'>Cập nhật lần cuối</p>
              <p>{formatDate(user.updatedAt)}</p>
            </div>
          </div>

          <div className='flex justify-end gap-2'>
            <Button variant='outline' onClick={onClose}>
              Đóng
            </Button>
            <Link passHref href={`/dashboard/user/${user.id}/edit`}>
              <Button onClick={onClose}>Chỉnh sửa</Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
