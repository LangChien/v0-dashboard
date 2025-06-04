'use client'

import { type LucideIcon } from 'lucide-react'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export interface INavItem {
  title: string
  url: string
  icon?: LucideIcon
  isChildren?: boolean
}
export const NavMain = ({
  items,
  label,
  ...props
}: {
  items: INavItem[]
  label: string
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) => {
  const pathName = usePathname()
  return (
    <SidebarGroup {...props}>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent className='flex flex-col gap-2'>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem className={cn(item.isChildren && 'ps-4')} key={item.title}>
              <Link passHref href={item.url}>
                <SidebarMenuButton isActive={pathName === item.url} tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
