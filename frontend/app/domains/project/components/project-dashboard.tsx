import { Button } from '@/shared/ui/button'
import { Separator } from '@/shared/ui/separator'
import { Plus } from 'lucide-react'
import ProjectList from './project-list'
import ProjectModal from './project-modal'
import { Modal } from '@/shared/components/modal'
import type { Project } from '@/shared/models/project'
import { useModalActions } from '@/shared/store/modal'
import { useAddProject, useUpdateProject } from '../services'

export default function ProjectDashboard() {
  const { openModal } = useModalActions()

  const addProjectMutation = useAddProject()
  const updateProjectMutation = useUpdateProject()

  const handleAddClick = () => {
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
      <div className="flex h-full w-full flex-col gap-4">
        <header className="flex h-16 w-full items-center justify-between p-4">
          <h1 className="text-2xl font-bold">Project Dashboard</h1>
          <Button variant="outline" size="icon" onClick={handleAddClick}>
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
