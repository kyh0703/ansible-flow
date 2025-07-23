import type { ModelNode } from '@/models/node'
import type { AppNode, CustomNodeType } from '@xyflow/react'

export function toModelNode(node: AppNode): ModelNode {
  return {
    id: node.data.databaseId!,
    uuid: node.id,
    flowId: node.data.flowId!,
    type: node.type,
    position: node.position,
    width: node.measured?.width || 0,
    height: node.measured?.height || 0,
    description: node.data.description || '',
    hidden: node.hidden || false,
  }
}


export function toAppNode(node: ModelNode): AppNode {
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
