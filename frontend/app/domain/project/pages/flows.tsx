import { Spinner } from '@/shared/ui/spinner'
import { Suspense } from 'react'
import { useParams } from 'react-router'
import FlowHeader from '../components/flow-header'
import FlowList from '../components/flow-list'

export default function FlowsPage() {
  const { projectId, projectName } = useParams()

  if (!projectId || !projectName) {
    return <div>Project ID not found</div>
  }

  return (
    <div className="flex h-full w-full flex-col">
      <FlowHeader projectId={projectId} projectName={projectName} />
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
  )
}
