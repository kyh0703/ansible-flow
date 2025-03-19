import { Link } from 'react-router-dom';

export function StatusBar() {
  return (
    <div className='flex h-6 items-center justify-end gap-2 border-t bg-background px-2 text-xs text-foreground'>
      <div className='flex items-center space-x-2'>
        <Link to='/manuals' target='_blank' rel='noopener noreferrer'>
          <div className='flex rounded-sm border'></div>
        </Link>
      </div>
      <div className='flex items-center space-x-2'>
        <span>Copyright (C) portfolio, All Rights Reserved.</span>
      </div>
    </div>
  );
}
