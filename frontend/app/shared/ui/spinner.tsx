import { cn } from '../lib/cn'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-current border-t-transparent',
        size === 'sm' && 'h-4 w-4 border-2',
        size === 'md' && 'h-6 w-6 border-2',
        size === 'lg' && 'h-8 w-8 border-[3px]',
        className,
      )}
    />
  )
}
