'use client'

import { useSelectedNode } from '@/stores/flow-store'
import { useYjs } from '../../_contexts'
import BasicFlow from '../basic-flow'

export default function FlowPanel() {
  const { projectId, flowId } = useYjs()

  const selectedNode = useSelectedNode()

  return (
    <div className="flex h-full w-full bg-blue-100">
      <BasicFlow initialNodes={[]} initialEdges={[]} />
      {selectedNode && <div>Selected Node: {selectedNode}</div>}
    </div>
  )
}
