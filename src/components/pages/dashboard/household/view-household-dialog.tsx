'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { formatDate, formatDateShort } from '@/lib/utils'
import { GENDER_LABELS } from '@/services/enum-label'
import { HouseholdIncludeCitizen } from '@/services/types/household.dto'
import { Calendar, Home, MapPin, User, Users } from 'lucide-react'
import Link from 'next/link'

interface ViewHouseholdDialogProps {
  household: HouseholdIncludeCitizen
  open: boolean
  onClose: () => void
}

export const ViewHouseholdDialog = ({ household, open, onClose }: ViewHouseholdDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[700px] max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Home className='h-5 w-5' />
            Thông tin hộ gia đình
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Household Header */}
          <Card>
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-xl'>Hộ gia đình {household.houseNumber}</CardTitle>
                <Badge variant='secondary' className='bg-blue-100 text-blue-800'>
                  {household._count.members} thành viên
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className='flex items-center gap-2'>
                <MapPin className='h-4 w-4 text-red-600' />
                <div>
                  <p className='text-sm text-gray-600'>Địa chỉ</p>
                  <p className='font-semibold'>{household.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Head of Household */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <User className='h-4 w-4' />
                Thông tin chủ hộ
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='bg-blue-50 p-4 rounded-lg'>
                <div className='flex items-center justify-between mb-3'>
                  <h4 className='font-semibold text-lg'>{household.headCitizen.fullName}</h4>
                  <Badge variant='outline'>{GENDER_LABELS[household.headCitizen.gender]}</Badge>
                </div>

                <div className='grid grid-cols-2 gap-4 text-sm'>
                  <div>
                    <p className='text-gray-600'>Tuổi</p>
                    <p className='font-medium'>{household.headCitizen.age} tuổi</p>
                  </div>
                  <div>
                    <p className='text-gray-600'>Ngày sinh</p>
                    <p className='font-medium'>
                      {formatDateShort(household.headCitizen.dateOfBirth)}
                    </p>
                  </div>
                  <div>
                    <p className='text-gray-600'>Số CMND/CCCD</p>
                    <p className='font-medium font-mono'>{household.headCitizen.nationalId}</p>
                  </div>
                  <div>
                    <p className='text-gray-600'>Nghề nghiệp</p>
                    <p className='font-medium'>{household.headCitizen.occupation}</p>
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-sm text-gray-600'>Dân tộc</p>
                  <p className='font-semibold'>{household.headCitizen.ethnicity}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Tôn giáo</p>
                  <p className='font-semibold'>{household.headCitizen.religion}</p>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-sm text-gray-600'>Ngày cấp CMND/CCCD</p>
                  <p className='font-semibold'>
                    {formatDateShort(household.headCitizen.issueDate)}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Nơi cấp</p>
                  <p className='font-semibold'>{household.headCitizen.issuePlace}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Household Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Users className='h-4 w-4' />
                Thống kê hộ gia đình
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-3 gap-4 text-center'>
                <div className='bg-green-50 p-4 rounded-lg'>
                  <div className='text-2xl font-bold text-green-600'>
                    {household._count.members}
                  </div>
                  <div className='text-sm text-gray-600'>Tổng thành viên</div>
                </div>
                <div className='bg-blue-50 p-4 rounded-lg'>
                  <div className='text-2xl font-bold text-blue-600'>1</div>
                  <div className='text-sm text-gray-600'>Chủ hộ</div>
                </div>
                <div className='bg-purple-50 p-4 rounded-lg'>
                  <div className='text-2xl font-bold text-purple-600'>
                    {household._count.members - 1}
                  </div>
                  <div className='text-sm text-gray-600'>Thành viên khác</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* System Information */}
          <div className='grid grid-cols-2 gap-4 text-sm text-gray-600'>
            <div className='flex items-center gap-2'>
              <Calendar className='h-4 w-4' />
              <div>
                <p className='font-medium'>Ngày tạo</p>
                <p>{formatDate(household.createdAt)}</p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Calendar className='h-4 w-4' />
              <div>
                <p className='font-medium'>Cập nhật lần cuối</p>
                <p>{formatDate(household.updatedAt)}</p>
              </div>
            </div>
          </div>

          <div className='flex justify-end gap-2'>
            <Button variant='outline' onClick={onClose}>
              Đóng
            </Button>
            <Link passHref href={`/dashboard/household/${household.id}/edit`}>
              <Button onClick={onClose}>Chỉnh sửa</Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
