import { SidebarProvider } from '@/shared/ui/sidebar'
import { Outlet } from 'react-router'
import AppSidebar from './sidebar'

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex h-full w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  )
}
