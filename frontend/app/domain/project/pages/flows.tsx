import { Spinner } from '@/shared/ui/spinner'
import { Button } from '@/shared/ui/button'
import { Separator } from '@/shared/ui/separator'
import { Plus } from 'lucide-react'
import { Suspense } from 'react'
import { useParams, Link } from 'react-router'
import FlowList from '../components/flow-list'
import FlowModal from '../components/flow-modal'
import { Modal } from '@/shared/components/modal'
import { useModalActions } from '@/shared/store/modal'

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
      // TODO: 플로우 생성 API 호출
      console.log('Creating flow:', flow)
    } else {
      // TODO: 플로우 업데이트 API 호출
      console.log('Updating flow:', flow)
    }
  }

  return (
    <>
      <Modal id="flow-modal" title="Flow Form">
        <FlowModal onSubmit={handleSubmit} />
      </Modal>

      <div className="flex h-full w-full flex-col">
        <header className="flex h-16 w-full items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Link
              to={`/projects/${projectId}`}
              className="text-muted-foreground hover:text-foreground"
            >
              ← Back to Project
            </Link>
            <h1 className="text-2xl font-bold">Flows</h1>
          </div>
          <Button variant="outline" size="icon" onClick={handleAddClick}>
            <Plus className="h-4 w-4" />
          </Button>
        </header>
        <Separator />
        <main className="flex-1">
          <Suspense fallback={<Spinner />}>
            <FlowList projectId={parseInt(projectId)} />
          </Suspense>
        </main>
      </div>
    </>
  )
}
