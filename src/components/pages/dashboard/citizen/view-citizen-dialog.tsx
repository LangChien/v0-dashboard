import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { formatDate, formatDateShort } from '@/lib/utils'
import { GENDER_COLORS, GENDER_LABELS } from '@/services/enum-label'
import { Citizen } from '@/services/types/citizen.dto'
import { Briefcase, Calendar, CreditCard, MapPin, User, Users } from 'lucide-react'
import Link from 'next/link'

interface ViewCitizenDialogProps {
  citizen: Citizen
  open: boolean
  onClose: () => void
}

export const ViewCitizenDialog = ({ citizen, open, onClose }: ViewCitizenDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[700px] max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <User className='h-5 w-5' />
            Thông tin cư dân
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Header Info */}
          <Card>
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-xl'>{citizen.fullName}</CardTitle>
                <Badge className={GENDER_COLORS[citizen.gender]}>
                  {GENDER_LABELS[citizen.gender]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='flex items-center gap-2'>
                  <Calendar className='h-4 w-4 text-blue-600' />
                  <div>
                    <p className='text-sm text-gray-600'>Tuổi</p>
                    <p className='font-semibold'>{citizen.age} tuổi</p>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className='h-4 w-4 text-green-600' />
                  <div>
                    <p className='text-sm text-gray-600'>Ngày sinh</p>
                    <p className='font-semibold'>{formatDateShort(citizen.dateOfBirth)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Users className='h-4 w-4' />
                Thông tin cá nhân
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-sm text-gray-600'>Dân tộc</p>
                  <p className='font-semibold'>{citizen.ethnicity}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Tôn giáo</p>
                  <p className='font-semibold'>{citizen.religion}</p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Briefcase className='h-4 w-4 text-purple-600' />
                <div>
                  <p className='text-sm text-gray-600'>Nghề nghiệp</p>
                  <p className='font-semibold'>{citizen.occupation}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Identity Information */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <CreditCard className='h-4 w-4' />
                Thông tin giấy tờ
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <p className='text-sm text-gray-600'>Số CMND/CCCD</p>
                <p className='font-semibold text-lg font-mono'>{citizen.nationalId}</p>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-sm text-gray-600'>Ngày cấp</p>
                  <p className='font-semibold'>{formatDateShort(citizen.issueDate)}</p>
                </div>
                <div className='flex items-center gap-2'>
                  <MapPin className='h-4 w-4 text-red-600' />
                  <div>
                    <p className='text-sm text-gray-600'>Nơi cấp</p>
                    <p className='font-semibold'>{citizen.issuePlace}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* System Information */}
          <div className='grid grid-cols-2 gap-4 text-sm text-gray-600'>
            <div>
              <p className='font-medium'>Ngày tạo</p>
              <p>{formatDate(citizen.createdAt)}</p>
            </div>
            <div>
              <p className='font-medium'>Cập nhật lần cuối</p>
              <p>{formatDate(citizen.updatedAt)}</p>
            </div>
          </div>

          <div className='flex justify-end gap-2'>
            <Button variant='outline' onClick={onClose}>
              Đóng
            </Button>
            <Link passHref href={`/dashboard/citizen/${citizen.id}/edit`}>
              <Button onClick={onClose}>Chỉnh sửa</Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
