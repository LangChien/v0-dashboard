import { USER_ROLE } from '@/services/schemas/user.schema'
import {
  Activity,
  ChartSpline,
  CircleUserRound,
  FilePlus,
  HandCoins,
  History,
  Home,
  HousePlus,
  UserPlus,
  Users,
} from 'lucide-react'
import { INavItem } from './nav-main'

export interface INavItemData {
  roles: USER_ROLE[]
  label: string
  items: INavItem[]
}

export const sidebarData: Record<string, INavItemData> = {
  common: {
    label: 'Chung',
    roles: Object.values(USER_ROLE),
    items: [
      {
        title: 'Tổng quan',
        url: '/dashboard',
        icon: ChartSpline,
      },
    ],
  },
  househole: {
    label: 'Quản lý căn hộ',
    roles: [USER_ROLE.TEAM_LEADER],
    items: [
      {
        title: 'Thống kê căn hộ',
        url: '/dashboard/household',
        icon: Home,
      },
      {
        title: 'Thêm căn hộ',
        url: '/dashboard/household/create',
        icon: HousePlus,
      },
      {
        title: 'Thống kê cư dân',
        url: '/dashboard/citizen',
        icon: Users,
      },
      {
        title: 'Thêm cư dân',
        url: '/dashboard/citizen/create',
        icon: UserPlus,
      },
    ],
  },
  fee: {
    label: 'Quản lý khoản thu',
    roles: [USER_ROLE.ACCOUNTANT],
    items: [
      {
        title: 'Danh sách hộ gia đình',
        url: '/dashboard/fee/household',
        icon: Home,
      },
      {
        title: 'Khoản thu',
        url: '/dashboard/fee',
        icon: HandCoins,
      },
      {
        title: 'Thêm khoản thu',
        url: '/dashboard/fee/create',
        icon: FilePlus,
      },
      {
        title: 'Lịch sử giao dịch',
        url: '/dashboard/fee/payment',
        icon: History,
      },
      {
        title: 'Thống kê khoản thu',
        url: '/dashboard/fee/statistic',
        icon: Activity,
      },
    ],
  },
  auth: {
    label: 'Quản lý người dùng',
    roles: [USER_ROLE.SYSTEM_ADMIN, USER_ROLE.TEAM_LEADER],
    items: [
      {
        title: 'Tài khoản',
        url: '/dashboard/account',
        icon: CircleUserRound,
      },
      {
        title: 'Thêm tài khoản',
        url: '/dashboard/account/create',
        icon: UserPlus,
      },
    ],
  },
}
