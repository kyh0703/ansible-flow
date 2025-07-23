import { ThemeProvider } from '@/providers/theme-provider';

export default function Provider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
