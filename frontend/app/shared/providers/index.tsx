import { Outlet } from 'react-router'
import QueryProvider from './query-provider'
import { ThemeProvider } from './theme-provider'
import { ToastContainer } from 'react-toastify'

export default function Provider() {
  return (
    <ThemeProvider defaultTheme="system">
      <QueryProvider>
        <Outlet />
        <ToastContainer position="bottom-right" theme="colored" />
      </QueryProvider>
    </ThemeProvider>
  )
}
