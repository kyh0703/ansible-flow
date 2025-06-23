import { ThemeButton } from '@/shared/components/theme-button'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { Crown, Plus, Search, Filter, LayoutGrid, List } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { useSubscriptionStore } from '@/shared/store/subscription'
import { Input } from '@/shared/ui/input'
import { Separator } from '@/shared/ui/separator'

export default function Header() {
  const { currentSubscription, canCreateProject, upgradeRequired } =
    useSubscriptionStore()
  const location = useLocation()

  const getBreadcrumb = () => {
    const paths = location.pathname.split('/').filter(Boolean)
    if (paths.length === 1 && paths[0] === 'projects') {
      return 'All Projects'
    }
    if (paths.length === 2) {
      return `Project • ${paths[1]}`
    }
    if (paths.length === 3) {
      return `Project • ${paths[1]} • ${paths[2]}`
    }
    return 'Projects'
  }

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-border/40 border-b backdrop-blur">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <span className="text-foreground font-medium">
              {getBreadcrumb()}
            </span>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <div className="relative max-w-md">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Search projects..."
              className="bg-muted/50 focus-visible:ring-ring h-9 w-80 border-0 pl-9 focus-visible:ring-1"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-muted/50 flex items-center gap-1 rounded-lg p-1">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Filter className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex items-center gap-2">
            <Badge
              variant={
                currentSubscription.planType === 'pro' ||
                currentSubscription.planType === 'enterprise'
                  ? 'default'
                  : 'secondary'
              }
              className="flex items-center gap-1 text-xs"
            >
              {(currentSubscription.planType === 'pro' ||
                currentSubscription.planType === 'enterprise') && (
                <Crown className="size-3" />
              )}
              {currentSubscription.planName}
            </Badge>

            <span className="text-muted-foreground text-sm">
              {currentSubscription.maxProjects === -1
                ? `${currentSubscription.currentProjects} projects`
                : `${currentSubscription.currentProjects}/${currentSubscription.maxProjects} projects`}
            </span>
          </div>

          {upgradeRequired() && (
            <Link to="/subscription">
              <Button size="sm" className="flex h-8 items-center gap-1">
                <Crown className="size-4" />
                Upgrade
              </Button>
            </Link>
          )}

          <Button
            size="sm"
            className="flex h-8 items-center gap-1"
            disabled={!canCreateProject()}
            onClick={() => {
              if (!canCreateProject()) {
                window.location.href = '/subscription'
              } else {
                console.log('새 프로젝트 생성')
              }
            }}
          >
            <Plus className="size-4" />
            New Project
          </Button>

          <ThemeButton />
        </div>
      </div>
    </header>
  )
}
