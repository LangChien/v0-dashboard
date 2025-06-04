import { SiteHeader } from '@/components/common/site-header'
import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { ReactNode } from 'react'

export default async function SidebarLayout(props: { children: ReactNode; modal: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar variant='sidebar' />
      <SidebarInset>
        <SiteHeader />
        <main className='container mx-auto py-8 px-4'>
          {props.children}
          {props.modal}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
