import { Outlet, useParams } from 'react-router'
import { ToastContainer } from 'react-toastify'
import Header from './header'
import { StatusBar } from './status-bar'
import NavigationBar from './navigation-bar'

export default function Layout() {
  const { projectId } = useParams()

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="flex h-full w-full flex-col">
        <Header />
        <div className="flex h-full grow">
          <NavigationBar />
          <Outlet />
        </div>
      </div>
      <StatusBar />
      <ToastContainer />
    </div>
  )
}
