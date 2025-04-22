import { Outlet } from 'react-router'
import QueryProvider from './query-provider'
import { ThemeProvider } from './theme-provider'
import { ToastContainer } from 'react-toastify'
import { TooltipProvider } from '../ui/tooltip'

export default function Provider() {
  return (
    <ThemeProvider defaultTheme="system">
      <QueryProvider>
        <TooltipProvider>
          <Outlet />
          <ToastContainer position="bottom-right" theme="colored" />
        </TooltipProvider>
      </QueryProvider>
    </ThemeProvider>
  )
}
