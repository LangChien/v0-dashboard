'use client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const PAGE_TABS = [
  {
    name: 'Thông tin chung',
    value: 'profile',
  },
  {
    name: 'Thành viên',
    value: 'member',
  },
  {
    name: 'Lịch sử thay đổi',
    value: 'history',
  },
]

export const HouseHoldNavbar = () => {
  const pathname = usePathname()
  const page = pathname.split('/').at(-1)
  const prefixUrl = pathname.replace(`/${page}`, '')
  return (
    <Tabs value={page} className='w-full mb-5'>
      <TabsList className='grid w-full grid-cols-3'>
        {PAGE_TABS.map((tab) => (
          <Link passHref key={tab.value} href={`${prefixUrl}/${tab.value}`}>
            <TabsTrigger
              value={tab.value}
              className='w-full'
              data-state={page === tab.value ? 'active' : ''}
            >
              {tab.name}
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
    </Tabs>
  )
}
