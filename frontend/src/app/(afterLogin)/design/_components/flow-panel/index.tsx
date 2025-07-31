'use client'

import { useSelectedNode } from '@/stores/flow-store'
import { useYjs } from '../../_contexts'
import BasicFlow from '../design-flow'
import { useQueryStructure } from '@/services/flows'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function FlowPanel() {
  const { projectId, flowId } = useYjs()

  const selectedNode = useSelectedNode()

  const { data } = useSuspenseQuery(useQueryStructure(projectId, flowId))

  return (
    <div className="flex h-full w-full bg-blue-100">
      <BasicFlow initialNodes={data.nodes} initialEdges={data.edges} />
      {selectedNode && <div>Selected Node: {selectedNode}</div>}
    </div>
  )
}
