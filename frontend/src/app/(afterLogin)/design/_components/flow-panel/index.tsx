'use client'

import { useQueryStructure } from '@/services/flows'
import { useSelectedNodeId } from '@/stores/flow-store'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useYjs } from '../../_contexts'
import BasicFlow from '../design-flow'

export default function FlowPanel() {
  const { projectId, flowId } = useYjs()

  const selectedNodeId = useSelectedNodeId()

  const { data } = useSuspenseQuery(useQueryStructure(projectId, flowId))

  return (
    <div className="flex h-full w-full bg-blue-100">
      <BasicFlow initialNodes={data.nodes} initialEdges={data.edges} />
      {selectedNodeId && <div>Selected Node: {selectedNodeId}</div>}
    </div>
  )
}
