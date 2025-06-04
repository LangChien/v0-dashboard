'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FeeStatistics as FeeStatisticsType } from '@/services/types/fee.dto'
import { CheckCircle, Clock, TrendingUp, Users } from 'lucide-react'

export function FeeStatistics({ stats }: { stats: FeeStatisticsType }) {
  const collectionRate =
    stats.totalAmount > 0 ? (stats.collectedAmount / stats.totalAmount) * 100 : 0

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Tổng khoản thu</CardTitle>
          <Users className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{stats.total}</div>
          <p className='text-xs text-muted-foreground'>Tất cả khoản thu trong hệ thống</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Chờ duyệt</CardTitle>
          <Clock className='h-4 w-4 text-yellow-600' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-yellow-600'>{stats.pending}</div>
          <p className='text-xs text-muted-foreground'>Khoản thu đang chờ phê duyệt</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Đã hoàn thành</CardTitle>
          <CheckCircle className='h-4 w-4 text-green-600' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-green-600'>{stats.completed}</div>
          <p className='text-xs text-muted-foreground'>Khoản thu đã hoàn thành</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Tỷ lệ thu</CardTitle>
          <TrendingUp className='h-4 w-4 text-blue-600' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-blue-600'>{collectionRate.toFixed(1)}%</div>
          <p className='text-xs text-muted-foreground'>
            {stats.collectedAmount.toLocaleString('vi-VN')} /{' '}
            {stats.totalAmount.toLocaleString('vi-VN')} VNĐ
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
