import { Button } from '~/ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <MoonIcon className='light-icon' size={20} />
      <SunIcon className='dark-icon' size={20} />
    </Button>
  );
}
