import { LogoIcon } from '@/shared/components/icon'
import { LayersIcon, UserIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { twJoin } from 'tailwind-merge'

const getIconWrapperClasses = (hasFocus: boolean) =>
  twJoin(
    'flex item-center justify-center p-3',
    hasFocus ? 'bg-left-tool-focus' : 'bg-left-tool',
  )

export default function NavigationBar() {
  return (
    <nav className="w-left-nav bg-left-tool flex flex-col items-start">
      <div className="flex h-full w-full flex-col items-start justify-between">
        <div className="flex w-full flex-col">
          <div className="flex w-full flex-col items-start p-3">
            <LogoIcon color="#fff" />
          </div>
          <Link className="w-full" to={''}>
            <div>
              <LayersIcon size={24} color="#fff" cursor="pointer" />
            </div>
          </Link>
        </div>
        <div className="flex w-full flex-col">
          <div className={twJoin('item-center flex justify-center p-3')}>
            <UserIcon />
          </div>
        </div>
      </div>
    </nav>
  )
}
