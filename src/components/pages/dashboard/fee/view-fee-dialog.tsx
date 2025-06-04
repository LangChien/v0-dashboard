'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { FEE_STATUS_COLORS, FEE_STATUS_LABELS } from '@/services/enum-label'
import { FeeInludeCount } from '@/services/types/fee.dto'
import { Calendar, DollarSign, FileText, Users } from 'lucide-react'

interface ViewFeeDialogProps {
  fee: FeeInludeCount
  open: boolean
  onClose: () => void
}

export function ViewFeeDialog({ fee, open, onClose }: ViewFeeDialogProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount)
  }

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <FileText className='h-5 w-5' />
            Chi tiết khoản thu
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Basic Info */}
          <div className='space-y-4'>
            <div>
              <h3 className='text-lg font-semibold'>{fee.name}</h3>
              <div className='flex items-center gap-2 mt-2'>
                <Badge className={FEE_STATUS_COLORS[fee.status]}>
                  {FEE_STATUS_LABELS[fee.status]}
                </Badge>
                <Badge variant={fee.isMandatory ? 'default' : 'secondary'}>
                  {fee.isMandatory ? 'Bắt buộc' : 'Tự nguyện'}
                </Badge>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='flex items-center gap-2'>
                <DollarSign className='h-4 w-4 text-green-600' />
                <div>
                  <p className='text-sm text-gray-600'>Số tiền</p>
                  <p className='font-semibold'>{formatCurrency(fee.amount)}</p>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <Calendar className='h-4 w-4 text-blue-600' />
                <div>
                  <p className='text-sm text-gray-600'>Hạn nộp</p>
                  <p className='font-semibold'>{formatDate(fee.dueDate)}</p>
                </div>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Users className='h-4 w-4 text-purple-600' />
              <div>
                <p className='text-sm text-gray-600'>Số hộ đã nộp</p>
                <p className='font-semibold'>{fee.totalHouseholds} hộ</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Description */}
          {fee.description && (
            <div>
              <h4 className='font-medium mb-2'>Mô tả</h4>
              <p className='text-gray-700 bg-gray-50 p-3 rounded-lg'>{fee.description}</p>
            </div>
          )}

          <Separator />

          {/* Timestamps */}
          <div className='grid grid-cols-2 gap-4 text-sm text-gray-600'>
            <div>
              <p className='font-medium'>Ngày tạo</p>
              <p>{formatDate(fee.createdAt)}</p>
            </div>
            <div>
              <p className='font-medium'>Cập nhật lần cuối</p>
              <p>{formatDate(fee.updatedAt)}</p>
            </div>
          </div>

          <div className='flex justify-end'>
            <Button onClick={onClose}>Đóng</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
