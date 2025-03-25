import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'
import Header from './header'
import { StatusBar } from './status-bar'

export default function Main() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="flex h-full w-full flex-col">
        <Header />
        <div className="flex h-full grow">
          <Outlet />
        </div>
      </div>
      <StatusBar />
      <ToastContainer />
    </div>
  )
}
