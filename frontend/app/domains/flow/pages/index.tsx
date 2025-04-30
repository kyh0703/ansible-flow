import YjsProvider from '@/shared/contexts/yjs-context'
import BasicFlow from '../components/basic-flow'
import type { Route } from './+types/detail'
import { ReactFlowProvider } from '@xyflow/react'

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { projectId } = params
  return { projectId }
}

export default function Index({ loaderData }: Readonly<Route.ComponentProps>) {
  const { projectId } = loaderData

  if (!projectId) {
    throw new Error('Project ID is required')
  }

  return (
    <YjsProvider projectId={+projectId} baseUrl={import.meta.env.VITE_YJS_URL}>
      <ReactFlowProvider>
        <div className="flex h-full w-full">
          <BasicFlow flowId={+projectId} initialNodes={[]} initialEdges={[]} />
        </div>
      </ReactFlowProvider>
    </YjsProvider>
  )
}
