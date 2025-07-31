'use client'

import { ReactFlowProvider } from '@xyflow/react'
import type { PropsWithChildren } from 'react'
import { YjsProvider } from '../_contexts'

type Props = {
  projectId: string
  flowId: string
  yjsUrl: string
} & PropsWithChildren

export default function Provider({
  projectId,
  flowId,
  yjsUrl,
  children,
}: Readonly<Props>) {
  return (
    <YjsProvider projectId={projectId} flowId={flowId} baseUrl={yjsUrl}>
      <ReactFlowProvider>{children}</ReactFlowProvider>
    </YjsProvider>
  )
}
