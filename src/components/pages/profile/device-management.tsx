'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useRequest } from '@/hooks/use-request'
import { protectedRequest } from '@/services/routes/protected.request'
import { RefreshToken } from '@/services/types/user.dto'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Monitor, Smartphone, Tablet, X } from 'lucide-react'

export function DeviceManagement({ refreshTokens }: { refreshTokens: RefreshToken[] }) {
  const getDeviceIcon = (userAgent: string) => {
    if (userAgent.includes('Mobile')) return <Smartphone className='w-5 h-5' />
    if (userAgent.includes('Tablet')) return <Tablet className='w-5 h-5' />
    return <Monitor className='w-5 h-5' />
  }

  const getDeviceInfo = (userAgent: string) => {
    if (userAgent.includes('Chrome')) return 'Chrome Browser'
    if (userAgent.includes('Firefox')) return 'Firefox Browser'
    if (userAgent.includes('Safari')) return 'Safari Browser'
    if (userAgent.includes('Edge')) return 'Edge Browser'
    return 'Unknown Browser'
  }
  const handleRevokeToken = useRequest((tokenId: string) =>
    protectedRequest.revokeRefreshToken(tokenId),
  )
  const handleRevokeAllTokens = useRequest(() => protectedRequest.logoutAllDevices(), '/login')
  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Quản lý thiết bị</CardTitle>
          <CardDescription>
            Xem và quản lý các thiết bị đã đăng nhập vào tài khoản của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {refreshTokens.length === 0 ? (
              <p className='text-center text-gray-500 py-8'>Không có thiết bị nào đang đăng nhập</p>
            ) : (
              <>
                <div className='flex justify-between items-center'>
                  <p className='text-sm text-gray-600'>
                    Có {refreshTokens.length} thiết bị đang đăng nhập
                  </p>
                  {refreshTokens.length > 1 && (
                    <Button variant='outline' size='sm' onClick={handleRevokeAllTokens}>
                      Thu hồi tất cả
                    </Button>
                  )}
                </div>

                {refreshTokens.map((token, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50'
                  >
                    <div className='flex items-center gap-4'>
                      {getDeviceIcon(token.userAgent)}
                      <div>
                        <h4 className='font-medium'>{getDeviceInfo(token.userAgent)}</h4>
                        <div className='flex items-center gap-2 text-sm text-gray-500'>
                          <span>IP: {token.ip}</span>
                          <span>•</span>
                          <span>
                            Đăng nhập{' '}
                            {formatDistanceToNow(new Date(token.createdAt), {
                              addSuffix: true,
                              locale: vi,
                            })}
                          </span>
                        </div>
                        <p className='text-xs text-gray-400 mt-1'>TokenId: {token.tokenId}</p>
                        <p className='text-xs text-gray-400 mt-1'>Chi tiết: {token.userAgent}</p>
                        <div className='text-xs text-gray-400 mt-1'>
                          Hết hạn: {new Date(token.expiredAt).toLocaleDateString('vi-VN')}
                        </div>
                      </div>
                    </div>

                    <div className='flex items-center gap-2'>
                      <Badge
                        variant={new Date(token.expiredAt) > new Date() ? 'default' : 'destructive'}
                      >
                        {new Date(token.expiredAt) > new Date() ? 'Hoạt động' : 'Hết hạn'}
                      </Badge>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleRevokeToken(token.tokenId)}
                        className='text-red-600 hover:text-red-700'
                      >
                        <X className='w-4 h-4' />
                      </Button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
