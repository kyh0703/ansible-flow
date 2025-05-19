import { ReactFlowProvider } from '@xyflow/react'
import BasicFlow from '../components/basic-flow'
import YjsProvider from '../contexts/yjs-context'
import type { Route } from './+types/detail'

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { projectId, flowId } = params
  return { projectId, flowId }
}

export default function Index({ loaderData }: Readonly<Route.ComponentProps>) {
  const { projectId, flowId } = loaderData

  return (
    <YjsProvider
      projectId={+projectId}
      flowId={+flowId}
      baseUrl={import.meta.env.VITE_YJS_URL}
    >
      <ReactFlowProvider>
        <div className="flex h-full w-full">
          <BasicFlow flowId={+projectId} initialNodes={[]} initialEdges={[]} />
        </div>
      </ReactFlowProvider>
    </YjsProvider>
  )
}
