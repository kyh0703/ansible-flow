import { Button } from '@/shared/ui/button'
import { Crown } from 'lucide-react'
import ProjectList from './project-list'
import ProjectModal from './project-modal'
import { Modal } from '@/shared/components/modal'
import type { Project } from '@/shared/models/project'
import { useModalActions } from '@/shared/store/modal'
import { useAddProject, useUpdateProject } from '../services'
import { useSubscriptionStore } from '@/shared/store/subscription'
import { Link } from 'react-router'

export default function ProjectDashboard() {
  const { closeModal } = useModalActions()
  const { incrementProjectCount } = useSubscriptionStore()

  const addProjectMutation = useAddProject({
    onSuccess: () => {
      incrementProjectCount()
    },
  })
  const updateProjectMutation = useUpdateProject()

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

      <div className="flex h-full w-full flex-col">
        <main className="flex-1 p-4">
          <ProjectList />
        </main>
      </div>
    </>
  )
}
