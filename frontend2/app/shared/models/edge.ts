export interface ModelEdge {
  id: number
  uuid: string
  flowId: number
  source: string
  target: string
  type: string
  label: string
  hidden: boolean
  markerEnd?: {
    width: number
    height: number
    type: string
    color: string
  }
  updateAt?: string
  createAt?: string
}
