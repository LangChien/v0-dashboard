import { ProfileTabs } from '@/components/pages/profile/profile-tabs'
import { Card } from '@/components/ui/card'
import { protectedRequest } from '@/services/routes/protected.request'

export default async function ProfilePage({ params }: { params: { page: string } }) {
  const profileResponse = await protectedRequest.getProfile()
  return (
    <div className='container mx-auto py-8 px-4'>
      <div className='max-w-5xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Thông tin cá nhân</h1>
          <p className='text-gray-600 mt-2'>Quản lý thông tin tài khoản và cài đặt bảo mật</p>
        </div>

        <Card className='p-6'>
          <ProfileTabs profile={profileResponse.data} page={params.page} />
        </Card>
      </div>
    </div>
  )
}
