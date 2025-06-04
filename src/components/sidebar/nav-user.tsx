'use client'

import { BadgeCheck, Bell, ChevronsUpDown, Computer, Layers, LogOut } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { useUser } from '@/hooks/use-account'
import { useLogout } from '@/hooks/use-logout'
import { getFirstLetterUppercase } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '../ui/button'

export const NavUser = () => {
  const { isMobile } = useSidebar()
  const logout = useLogout()
  const user = useUser((state) => state.user)
  if (!user)
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <Button onClick={logout} className='w-full'>
            Đăng nhập
          </Button>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                {user.avatar && <AvatarImage src={user.avatar} alt={user.fullName} />}

                <AvatarFallback className='rounded-lg'>
                  {getFirstLetterUppercase(user.fullName)}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{user.fullName}</span>
                <span className='truncate text-xs'>{user.email}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  {user.avatar && <AvatarImage src={user.avatar} alt={user.fullName} />}
                  <AvatarFallback className='rounded-lg'>
                    {getFirstLetterUppercase(user.fullName)}
                  </AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>{user.fullName}</span>
                  <span className='truncate text-xs'>{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link passHref href={'/dashboard/protected/profile'}>
                <DropdownMenuItem>
                  <BadgeCheck />
                  Tài khoản
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <Bell />
                Thông báo
              </DropdownMenuItem>
              <Link passHref href={'/dashboard/protected/security'}>
                <DropdownMenuItem>
                  <Layers />
                  Đổi mật khẩu
                </DropdownMenuItem>
              </Link>
              <Link passHref href={'/dashboard/protected/devices'}>
                <DropdownMenuItem>
                  <Computer />
                  Thiết bị đăng nhập
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
