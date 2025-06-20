import { Outlet } from 'react-router'
import { SidebarProvider } from '@/shared/ui/sidebar'
import AppSidebar from './sidebar'
import Header from './header'

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex h-full w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
