import type { AppNode, CustomNodeType, XYPosition } from '@xyflow/react'

export interface ModelNode {
  id: number
  uuid: string
  flowId: number
  type: string
  width: number
  height: number
  position: XYPosition
  hidden: boolean
  description: string
  updateAt?: string
  createAt?: string
}

export function toNode(node: AppNode): ModelNode {
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

export function fromNode(node: ModelNode): AppNode {
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
