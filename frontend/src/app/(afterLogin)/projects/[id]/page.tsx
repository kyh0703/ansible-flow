import { Spinner } from '@/components/ui/spinner'
import { Suspense } from 'react'
import FlowHeader from '../_components/flow-header'
import FlowList from '../_components/flow-list'

type ProjectPageProps = {
  params: Promise<{ projectId: string }>
  searchParams: Promise<{ name: string }>
}

export default async function ProjectPage({
  params,
  searchParams,
}: Readonly<ProjectPageProps>) {
  const { projectId } = await params
  const { name } = await searchParams

  if (!projectId || !name) {
    return <div>Project ID not found</div>
  }

  return (
    <div className="flex h-full w-full flex-col">
      <FlowHeader projectId={projectId} projectName={name} />
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
