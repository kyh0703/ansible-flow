import { Spinner } from '@/components/ui/spinner'
import { Suspense } from 'react'
import FlowHeader from '../_components/flow-header'
import FlowList from '../_components/flow-list'

type Props = {
  params: Promise<{ projectId: string }>
  searchParams: Promise<{ projectName: string }>
}

export default async function Page({params, searchParams}: Readonly<Props>) {
  const {projectId} = await params
  const {projectName} = await searchParams

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
