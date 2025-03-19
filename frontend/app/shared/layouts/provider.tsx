import { Outlet } from 'react-router'
import QueryProvider from '~/shared/providers/query-provider'
import { ThemeProvider } from '~/shared/providers/theme-provider'

export default function Provider() {
  return (
    <ThemeProvider defaultTheme="system">
      <QueryProvider>
        <Outlet />
      </QueryProvider>
    </ThemeProvider>
  )
}
