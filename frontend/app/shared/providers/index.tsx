import { Outlet } from 'react-router'
import QueryProvider from './query-provider'
import { ThemeProvider } from './theme-provider'

export default function Provider() {
  return (
    <ThemeProvider defaultTheme="system">
      <QueryProvider>
        <Outlet />
      </QueryProvider>
    </ThemeProvider>
  )
}
