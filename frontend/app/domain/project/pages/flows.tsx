import { Modal } from '@/shared/components/modal'
import { useModalActions } from '@/shared/store/modal'
import { Button } from '@/shared/ui/button'
import { Separator } from '@/shared/ui/separator'
import { Spinner } from '@/shared/ui/spinner'
import { Plus } from 'lucide-react'
import { Suspense } from 'react'
import { Link, useParams } from 'react-router'
import FlowList from '../components/flow-list'
import FlowModal from '../components/flow-modal'

interface Flow {
  id?: number
  name: string
  description: string
}

export default function FlowsPage() {
  const { projectId } = useParams()
  const { openModal } = useModalActions()

  if (!projectId) {
    return <div>Project ID not found</div>
  }

  const handleAddClick = () => {
    openModal('flow-modal', { mode: 'create' })
  }

  const handleSubmit = (mode: 'create' | 'update', flow: Flow) => {
    if (mode === 'create') {
      console.log('Creating flow:', flow)
    } else {
      console.log('Updating flow:', flow)
    }
  }

  return (
    <>
      <Modal id="flow-modal" title="Flow Form">
        <FlowModal onSubmit={handleSubmit} />
      </Modal>

      <div className="flex h-full w-full flex-col">
        <header className="flex h-20 w-full items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <Link
              to="/projects"
              className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
            >
              ← Back to Projects
            </Link>
            <div className="bg-border h-6 w-px" />
            <div>
              <h1 className="text-2xl font-bold">Flows</h1>
              <p className="text-muted-foreground text-sm">
                프로젝트의 플로우를 관리하세요
              </p>
            </div>
          </div>
          <Button onClick={handleAddClick} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />새 플로우
          </Button>
        </header>
        <Separator />
        <main className="flex-1">
          <Suspense
            fallback={
              <div className="flex h-40 items-center justify-center">
                <Spinner size="lg" />
              </div>
            }
          >
            <FlowList projectId={projectId} />
          </Suspense>
        </main>
      </div>
    </>
  )
}
