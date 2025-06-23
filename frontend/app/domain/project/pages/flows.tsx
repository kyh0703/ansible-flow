import { Modal } from '@/shared/components/modal'
import { Separator } from '@/shared/ui/separator'
import { Spinner } from '@/shared/ui/spinner'
import { Suspense } from 'react'
import { useParams } from 'react-router'
import FlowList from '../components/flow-list'
import FlowModal from '../components/flow-modal'
import FlowHeader from '../components/flow-header'

interface Flow {
  id?: number
  name: string
  description: string
}

export default function FlowsPage() {
  const { projectId } = useParams()

  if (!projectId) {
    return <div>Project ID not found</div>
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
        <FlowHeader />
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
