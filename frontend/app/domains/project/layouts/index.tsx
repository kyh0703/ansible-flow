import { Outlet } from 'react-router'
import { SidebarProvider } from '@/shared/ui/sidebar'
import AppSidebar from './sidebar'

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex h-full w-full">
        <AppSidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
