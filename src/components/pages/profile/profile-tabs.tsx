'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserIncludeRefreshToken } from '@/services/types/user.dto'
import { Shield, Smartphone, User } from 'lucide-react'
import Link from 'next/link'
import { DeviceManagement } from './device-management'
import { ProfileInfo } from './profile-info'
import { SecuritySettings } from './security-settings'

const PAGE_TABS = [
  {
    title: 'Thông tin cá nhân',
    value: 'profile',
    icon: User,
    url: '/dashboard/protected/profile',
  },
  {
    title: 'Bảo mật',
    value: 'security',
    icon: Shield,
    url: '/dashboard/protected/security',
  },
  {
    title: 'Thiết bị',
    value: 'devices',
    icon: Smartphone,
    url: '/dashboard/protected/devices',
  },
]

export const ProfileTabs = (props: { profile: UserIncludeRefreshToken; page: string }) => {
  const { profile, page } = props
  return (
    <Tabs defaultValue='profile' value={page} className='w-full'>
      <TabsList className='grid w-full grid-cols-3'>
        {PAGE_TABS.map((tab) => (
          <Link passHref href={tab.url} className='w-full' key={tab.value}>
            <TabsTrigger value={tab.value} className='w-full flex items-center gap-2'>
              <tab.icon className='w-4 h-4' />
              {tab.title}
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>

      <TabsContent value='profile' className='mt-6'>
        <ProfileInfo profile={profile} />
      </TabsContent>

      <TabsContent value='security' className='mt-6'>
        <SecuritySettings />
      </TabsContent>

      <TabsContent value='devices' className='mt-6'>
        <DeviceManagement refreshTokens={profile.refreshTokens} />
      </TabsContent>
    </Tabs>
  )
}
