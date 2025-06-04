'use client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const PAGE_TABS = [
  {
    title: 'Danh sách hộ gia đình',
    url: '/dashboard/fee/household',
  },
  {
    title: 'Khoản thu ',
    url: '/dashboard/fee',
  },
  {
    title: 'Lịch sử thu',
    url: '/dashboard/fee/payment',
  },
]

export const FeeNavbar = () => {
  const pathname = usePathname()
  return (
    <Tabs value={pathname} className='w-full mb-5'>
      <TabsList className='w-full grid grid-cols-3 gap-3'>
        {PAGE_TABS.map((tab) => (
          <Link passHref key={tab.url} href={tab.url}>
            <TabsTrigger
              value={tab.url}
              className='w-full text-base'
              data-state={pathname === tab.url ? 'active' : ''}
            >
              {tab.title}
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
    </Tabs>
  )
}
