'use client'

import type { PropsWithChildren } from 'react'
import YjsProvider from '../_contexts/yjs-context'
import { ReactFlowProvider } from '@xyflow/react'

type Props = {
  projectId: string
  flowId: string
} & PropsWithChildren

export default function Provider({
  children,
  projectId,
  flowId,
}: Readonly<Props>) {
  return (
    <YjsProvider projectId={projectId} flowId={flowId}>
      <ReactFlowProvider>{children}</ReactFlowProvider>
    </YjsProvider>
  )
}
