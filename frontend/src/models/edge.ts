import type { CustomEdgeType } from '@xyflow/react'

export interface Edge {
  id: number
  uuid: string
  flowId: number
  source: string
  target: string
  type: CustomEdgeType
  label: string
  hidden: boolean
  markerEnd?: {
    width: number
    height: number
    type: string
    color: string
  }
  updateAt: Date
  createAt: Date
}
