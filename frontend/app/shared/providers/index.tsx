import { OverlayProvider } from 'overlay-kit'
import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { TooltipProvider } from '../ui/tooltip'
import QueryProvider from './query-provider'
import { ThemeProvider } from './theme-provider'

export default function Provider() {
  return (
    <ThemeProvider defaultTheme="system">
      <QueryProvider>
        <TooltipProvider>
          <OverlayProvider>
            <Outlet />
            <ToastContainer position="bottom-right" theme="colored" />
          </OverlayProvider>
        </TooltipProvider>
      </QueryProvider>
    </ThemeProvider>
  )
}
