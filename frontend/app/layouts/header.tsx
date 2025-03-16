import { cn } from '~/lib/utils'
import { ThemeButton } from '~/ui/theme-button'

export default function Header() {
  return (
    <header
      className={cn(
        'flex items-center justify-between',
        'sticky',
        'font-noto text-xl leading-[26px] font-medium',
        'h-header',
        'px-[20px] py-[13px]',
        'border-b border-solid',
      )}
    >
      <nav></nav>
      <nav className="flex items-center gap-5">
        <ThemeButton />
      </nav>
    </header>
  )
}
