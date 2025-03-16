import { Outlet } from 'react-router'
import { ThemeProvider } from '~/ui/theme-provider'
import Header from './header'
import { StatusBar } from './status-bar'

export default function Main() {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="flex h-full w-full flex-col overflow-hidden">
        <div className="flex h-full w-full overflow-hidden">
          <div className="flex h-full w-full flex-col overflow-hidden">
            <Header />
            <div className="flex h-full grow overflow-hidden">
              <Outlet />
            </div>
          </div>
        </div>
        <StatusBar />
      </div>
    </ThemeProvider>
  )
}
