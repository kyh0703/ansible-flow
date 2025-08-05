import type { EdgeTypes } from '@xyflow/react'
import { EasyConnectionEdge } from './easy-connection-edge'

export enum Algorithm {
  Linear = 'linear',
  CatmullRom = 'catmull-rom',
  BezierCatmullRom = 'bezier-catmull-rom',
}

export const edgeTypes: EdgeTypes = {
  start: EasyConnectionEdge,
}
