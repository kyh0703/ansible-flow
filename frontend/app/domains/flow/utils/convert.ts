import type {
  AppEdge,
  AppNode,
  CustomEdgeType,
  CustomNodeType,
} from '@xyflow/react'
import type { Edge } from '~/shared/models/edge'
import type { Node } from '~/shared/models/node'

export function toModelNode(node: AppNode): Node {
  return {
    id: node.data.databaseId!,
    uuid: node.id,
    flowId: node.data.flowId!,
    type: node.type!,
    position: node.position,
    width: node.measured?.width || 0,
    height: node.measured?.height || 0,
    description: node.data.description || '',
    hidden: node.hidden || false,
  }
}

export function toAppNode(node: Node): AppNode {
  return {
    id: node.uuid,
    type: node.type as CustomNodeType,
    position: node.position,
    width: node.width,
    height: node.height,
    hidden: node.hidden,
    data: {
      databaseId: node.id,
      flowId: node.flowId,
      description: node.description,
      updateAt: node.updateAt,
      createAt: node.createAt,
    },
  }
}

export function toModelEdge(edge: AppEdge): Edge {
  return {
    id: edge.data?.databaseId!,
    type: edge.type as CustomEdgeType,
    source: edge.source,
    target: edge.target,
    label: edge.data?.condition || '',
    hidden: edge.hidden || false,
    markerEnd: edge.markerEnd ?? undefined,
  }
}
