import { Button } from '@/shared/ui/button'
import { Separator } from '@/shared/ui/separator'
import { Plus, Crown } from 'lucide-react'
import ProjectList from './project-list'
import ProjectModal from './project-modal'
import { Modal } from '@/shared/components/modal'
import type { Project } from '@/shared/models/project'
import { useModalActions } from '@/shared/store/modal'
import { useAddProject, useUpdateProject } from '../services'
import { useSubscriptionStore } from '@/shared/store/subscription'
import { Link } from 'react-router'

export default function ProjectDashboard() {
  const { openModal, closeModal } = useModalActions()
  const { canCreateProject, upgradeRequired, incrementProjectCount } =
    useSubscriptionStore()

  const addProjectMutation = useAddProject({
    onSuccess: () => {
      incrementProjectCount()
    },
  })
  const updateProjectMutation = useUpdateProject()

  const handleAddClick = () => {
    if (!canCreateProject()) {
      openModal('upgrade-modal')
      return
    }
    addProjectMutation.reset()
    openModal('form-modal', { mode: 'create' })
  }

  const handleSubmit = (mode: 'create' | 'update', project: Project) => {
    if (mode === 'create') {
      addProjectMutation.mutate(project)
    } else {
      updateProjectMutation.mutate({ id: project.id, data: project })
    }
  }

  return (
    <>
      <Modal id="form-modal" title="Project Form">
        <ProjectModal onSubmit={handleSubmit} />
      </Modal>

      <Modal id="upgrade-modal" title="Upgrade Required">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-amber-600">
            <Crown className="size-5" />
            <span className="font-semibold">Project Limit Reached</span>
          </div>
          <p className="text-muted-foreground text-sm">
            You've reached the maximum number of projects for your current plan.
            Upgrade to Pro for unlimited projects and advanced features.
          </p>
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => closeModal('upgrade-modal')}
            >
              Cancel
            </Button>
            <Link to="/subscription">
              <Button className="flex items-center gap-1">
                <Crown className="size-4" />
                Upgrade to Pro
              </Button>
            </Link>
          </div>
        </div>
      </Modal>

      <div className="flex h-full w-full flex-col gap-4">
        <header className="flex h-16 w-full items-center justify-between p-4">
          <h1 className="text-2xl font-bold">Project Dashboard</h1>
          <Button
            variant="outline"
            size="icon"
            onClick={handleAddClick}
            disabled={!canCreateProject()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </header>
        <Separator />
        <main className="flex-1 p-4">
          <ProjectList />
        </main>
      </div>
    </>
  )
}
