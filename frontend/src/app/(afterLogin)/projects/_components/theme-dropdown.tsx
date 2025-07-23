import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'
import { Check, SunMoon } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function ThemeDropdown() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="space-x-3">
        <SunMoon className="size-4" />
        <span>Theme</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
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
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}
