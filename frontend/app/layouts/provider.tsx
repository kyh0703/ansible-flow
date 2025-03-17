import { Outlet } from 'react-router'
import QueryProvider from '~/providers/query-provider'
import { ThemeProvider } from '~/providers/theme-provider'

export default function Provider() {
  return (
    <ThemeProvider defaultTheme="system">
      <QueryProvider>
        <Outlet />
      </QueryProvider>
    </ThemeProvider>
  )
}
