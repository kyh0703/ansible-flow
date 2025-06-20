import { ThemeButton } from '@/shared/components/theme-button'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { Crown, Plus } from 'lucide-react'
import { Link } from 'react-router'
import { useSubscriptionStore } from '@/shared/store/subscription'

export default function Header() {
  const { currentSubscription, canCreateProject, upgradeRequired } =
    useSubscriptionStore()

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
      <div className="flex h-16 items-center justify-between px-8">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Projects</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* 구독 상태 표시 */}
          <div className="flex items-center gap-2">
            <Badge
              variant={
                currentSubscription.planType === 'pro' ||
                currentSubscription.planType === 'enterprise'
                  ? 'default'
                  : 'secondary'
              }
              className="flex items-center gap-1"
            >
              {(currentSubscription.planType === 'pro' ||
                currentSubscription.planType === 'enterprise') && (
                <Crown className="size-3" />
              )}
              {currentSubscription.planName}
            </Badge>

            {/* 프로젝트 사용량 표시 */}
            <span className="text-muted-foreground text-sm">
              {currentSubscription.maxProjects === -1
                ? `${currentSubscription.currentProjects} projects`
                : `${currentSubscription.currentProjects}/${currentSubscription.maxProjects} projects`}
            </span>
          </div>

          {/* 업그레이드 버튼 (Basic 플랜이고 제한에 도달했을 때) */}
          {upgradeRequired() && (
            <Link to="/subscription">
              <Button size="sm" className="flex items-center gap-1">
                <Crown className="size-4" />
                Upgrade to Pro
              </Button>
            </Link>
          )}

          {/* 새 프로젝트 버튼 */}
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-1"
            disabled={!canCreateProject()}
            onClick={() => {
              if (!canCreateProject()) {
                // 제한 초과시 업그레이드 페이지로 이동
                window.location.href = '/subscription'
              } else {
                // TODO: 새 프로젝트 생성 모달 열기
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
