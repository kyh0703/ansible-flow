'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Check } from 'lucide-react'

interface ThemeDropdownProps {
  theme: string | undefined
  setTheme: (theme: string) => void
}

export default function ThemeDropdown({
  theme,
  setTheme,
}: Readonly<ThemeDropdownProps>) {
  return (
    <>
      <DropdownMenuItem onClick={() => setTheme('system')}>
        <div className="flex w-full items-center justify-between">
          <span>System</span>
          {theme === 'system' && <Check className="h-4 w-4" />}
        </div>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme('light')}>
        <div className="flex w-full items-center justify-between">
          <span>Light</span>
          {theme === 'light' && <Check className="h-4 w-4" />}
        </div>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme('dark')}>
        <div className="flex w-full items-center justify-between">
          <span>Dark</span>
          {theme === 'dark' && <Check className="h-4 w-4" />}
        </div>
      </DropdownMenuItem>
    </>
  )
}
