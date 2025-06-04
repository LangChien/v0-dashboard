'use client'
import { ModeToggle } from '@/components/theme/mode-toggle'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

export const SiteHeader = () => {
  const pathName = usePathname()
  const items = pathName.split('/').filter((item) => item !== '')
  const lastItem = items[items.length - 1]
  return (
    <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2 px-4 w-full'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Breadcrumb>
          <BreadcrumbList>
            {items.map((item, index) => {
              if (index === items.length - 1) return null
              return (
                <Fragment key={`breadcrumb-${index}-${item}`}>
                  <BreadcrumbItem className='hiden md:block'>
                    <BreadcrumbLink href={`/${items.slice(0, index + 1).join('/')}`}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className='hidden md:block' />
                </Fragment>
              )
            })}
            <BreadcrumbItem>
              <BreadcrumbPage className='capitalize'>{lastItem}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className='ms-auto pr-5'>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
