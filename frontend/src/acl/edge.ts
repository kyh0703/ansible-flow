import type { ModelEdge } from "@/models/edge"
import type { AppEdge } from "@xyflow/react"

export function toModelEdge(edge: AppEdge): ModelEdge {
  const modelEdge: ModelEdge = {
    id: edge.data?.databaseId!,
    type: edge.type,
    source: edge.source,
    target: edge.target,
    label: edge.data?.condition || '',
    hidden: edge.hidden || false,
    uuid: edge.id,
    flowId: edge.data?.flowId!,
  }

  if (edge.markerEnd && typeof edge.markerEnd === 'object') {
    modelEdge.markerEnd = {
      width: edge.markerEnd.width!,
      height: edge.markerEnd.height!,
      type: edge.markerEnd.type,
      color: edge.markerEnd.color!,
    }
  }

  return modelEdge
}
