'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar'

import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { AccessForRole } from '../common/role-access'
import { NavMain } from './nav-main'
import { NavUser } from './nav-user'
import { INavItemData, sidebarData } from './sidebar-data'

const NavAccess = ({ data: { roles, label, items } }: { data: INavItemData }) => (
  <AccessForRole roles={roles}>
    <Fragment>
      <NavMain label={label} items={items} />
      <SidebarSeparator />
    </Fragment>
  </AccessForRole>
)
export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link passHref href='/'>
              <SidebarMenuButton
                tooltip='Trở lại trang chính'
                className='bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800  data-[slot=sidebar-menu-button]:!p-1.5 h-14 text-3xl font-bold'
              >
                <Image
                  src='/logo-removebg.png'
                  alt='Blue Moon Logo'
                  width={60}
                  height={60}
                  className='object-contain'
                />
                <h1 className='text-xl font-bold text-white'>BLUE MOON</h1>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        {Object.values(sidebarData).map((data) => (
          <NavAccess key={data.label} data={data} />
        ))}
        <SidebarSeparator className='mt-auto' />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
