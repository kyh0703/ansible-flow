import { Outlet } from 'react-router'
import { Sidebar } from '~/shared/ui/sidebar'

export default function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
