import { Outlet } from 'react-router'
import { SidebarProvider } from '@/shared/ui/sidebar'
import { ProtectedRoute } from '@/domain/auth'
import AppSidebar from './sidebar'

export default function Layout() {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="flex h-full w-full">
          <AppSidebar />
          <div className="flex flex-1 flex-col">
            <Outlet />
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
