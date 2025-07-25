'use client'

import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider } from '@/providers'
import QueryProvider from '@/providers/query-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { OverlayProvider } from 'overlay-kit'

export default function Provider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider>
      <OverlayProvider>
        <QueryProvider>
          <AuthProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </AuthProvider>
        </QueryProvider>
      </OverlayProvider>
    </ThemeProvider>
  )
}
