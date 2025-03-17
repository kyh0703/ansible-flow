import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'

export default function Layout() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 p-4">
      <Outlet />
      <ToastContainer position="bottom-right" theme="colored" />
    </main>
  )
}
