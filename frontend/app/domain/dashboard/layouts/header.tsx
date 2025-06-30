import { LogoIcon } from '@/shared/components/icon'
import { ThemeButton } from '@/shared/components/theme-button'
import { useUser } from '@/shared/store/user'
import { Button } from '@/shared/ui/button'
import { Link, useNavigate } from 'react-router'

export default function Header() {
  const navigate = useNavigate()
  const user = useUser()

  if (user) {
    navigate('/projects')
    return null
  }

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
      <div className="flex h-16 items-center justify-between px-8">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <LogoIcon className="size-10" />
            <span className="font-bold">Ansible Flow Editor</span>
          </Link>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            to="#features"
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            Features
          </Link>
          <Link
            to="#how-it-works"
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            How It Works
          </Link>
          <Link
            to="#documentation"
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            Documentation
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeButton />
          <Button>
            <Link to="/auth/login">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
