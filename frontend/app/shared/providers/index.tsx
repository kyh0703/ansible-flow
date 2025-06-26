import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { TooltipProvider } from '../ui/tooltip'
import QueryProvider from './query-provider'
import { ThemeProvider } from './theme-provider'
import { OverlayProvider } from 'overlay-kit'
import { AuthProvider } from '@/domain/auth'

export default function Provider() {
  return (
    <ThemeProvider defaultTheme="system">
      <QueryProvider>
        <AuthProvider>
          <TooltipProvider>
            <OverlayProvider>
              <Outlet />
              <ToastContainer position="bottom-right" theme="colored" />
            </OverlayProvider>
          </TooltipProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  )
}
