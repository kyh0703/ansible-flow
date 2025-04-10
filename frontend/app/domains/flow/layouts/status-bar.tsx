import { Link } from 'react-router-dom'

export function StatusBar() {
  return (
    <div className="bg-background text-foreground flex h-6 items-center justify-end gap-2 border-t px-2 text-xs">
      <div className="flex items-center space-x-2">
        <Link to="/manuals" target="_blank" rel="noopener noreferrer">
          <div className="flex rounded-sm border"></div>
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        <span>Copyright (C) portfolio, All Rights Reserved.</span>
      </div>
    </div>
  )
}
