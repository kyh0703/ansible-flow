import { Outlet } from 'react-router'
import Header from './header'
import { StatusBar } from './status-bar'
import { ToastContainer } from 'react-toastify'
import Provider from './provider'

export default function Main() {
  return (
    <Provider>
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
        <ToastContainer />
      </div>
    </Provider>
  )
}
