import { Outlet } from 'react-router'

export default function Index() {
  return (
    <div className="flex h-full w-full flex-col">
      <Outlet />
    </div>
  )
}
