import { Modal } from '@/shared/components/modal'
import type { Project } from '@/shared/models/project'
import { useProjectActions, useProjectSearch } from '@/shared/store/project'
import { useSubscriptionStore } from '@/shared/store/subscription'
import { Badge } from '@/shared/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/shared/ui/breadcrumb'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Separator } from '@/shared/ui/separator'
import { Crown, Plus, Search } from 'lucide-react'
import { overlay } from 'overlay-kit'
import { Link, useNavigate } from 'react-router'
import { useAddProject } from '../services'
import ProjectModal from './project-modal'

export default function ProjectHeader() {
  const navigate = useNavigate()
  const { currentSubscription, canCreateProject, upgradeRequired } =
    useSubscriptionStore()
  const search = useProjectSearch()
  const { setSearch } = useProjectActions()

  const addProjectMutation = useAddProject()

  const handleNewProject = async () => {
    if (!canCreateProject()) {
      navigate('/subscription')
      return
    }

    const result = await overlay.openAsync(({ isOpen, close, unmount }) => (
      <Modal isOpen={isOpen} title="New Project" onExit={unmount}>
        <ProjectModal mode="create" onClose={close} />
      </Modal>
    ))
    if (!result) {
      return
    }

    const newProject = result as Project
    addProjectMutation.mutate(newProject)
  }

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-border/40 border-b backdrop-blur">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>All Projects</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Separator orientation="vertical" className="h-6" />

          <div className="relative max-w-md">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Search projects..."
              className="bg-muted/50 focus-visible:ring-ring h-9 w-80 border-0 pl-9 focus-visible:ring-1"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
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
            onClick={handleNewProject}
          >
            <Plus className="size-4" />
            New Project
          </Button>
        </div>
      </div>
    </header>
  )
}
