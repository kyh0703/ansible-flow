import type { CustomNodeType } from '@xyflow/react'

type PositionXY = {
  x: number
  y: number
}

type Style = {
  bgColor: string
  color: string
  borderStyle: string
  borderColor: string
  width: number
  height: number
  hidden: boolean
}

export interface Node {
  id: number
  uuid: string
  flowId: number
  type: CustomNodeType
  label: string
  position: PositionXY
  style: Style
  description: string
}
