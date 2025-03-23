import YjsProvider from '~/shared/contexts/yjs-context'
import Flow from '../components/flow'
import type { Route } from './+types/detail'
import { ReactFlowProvider } from '@xyflow/react'

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { flowId } = params
  return { flowId }
}

export default function Detail({ loaderData }: Route.ComponentProps) {
  const { flowId } = loaderData

  return (
    <YjsProvider flowId={+flowId} baseUrl={import.meta.env.VITE_YJS_URL}>
      <ReactFlowProvider>
        <div className="flex h-full w-full">
          <Flow flowId={+flowId} initialNodes={[]} initialEdges={[]} />
        </div>
      </ReactFlowProvider>
    </YjsProvider>
  )
}
