import { LogoIcon } from '@/shared/components/icon'
import { ThemeButton } from '@/shared/components/theme-button'
import { Button } from '@/shared/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/shared/ui/dialog'
import { Sheet, SheetContent, SheetTrigger } from '@/shared/ui/sheet'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthForm from '../components/auth-form'
import { LoginForm } from '../components/login-form'

export default function Header() {
  const [open, setOpen] = useState(false)

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
          <Dialog>
            <DialogTrigger asChild>
              <Button>Login</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <AuthForm />
            </DialogContent>
          </Dialog>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="mt-8 flex flex-col gap-4">
                <Link
                  to="#features"
                  className="text-sm font-medium underline-offset-4 hover:underline"
                  onClick={() => setOpen(false)}
                >
                  Features
                </Link>
                <Link
                  to="#how-it-works"
                  className="text-sm font-medium underline-offset-4 hover:underline"
                  onClick={() => setOpen(false)}
                >
                  How It Works
                </Link>
                <Link
                  to="#documentation"
                  className="text-sm font-medium underline-offset-4 hover:underline"
                  onClick={() => setOpen(false)}
                >
                  Documentation
                </Link>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mt-4">Login</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <LoginForm />
                  </DialogContent>
                </Dialog>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
