import type { XYPosition } from '@xyflow/react'

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
