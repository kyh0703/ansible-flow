import { type EdgeTypes } from '@xyflow/react'
import { EasyConnectionEdge } from '../_components/edge'

export const defaultEdgeOptions = {
  style: { strokeWidth: 1, opacity: 0.7 },
}

export enum Algorithm {
  Linear = 'linear',
  CatmullRom = 'catmull-rom',
  BezierCatmullRom = 'bezier-catmull-rom',
}

export const defaultAlgorithm = Algorithm.Linear

export const edgeTypes: EdgeTypes = {
  start: EasyConnectionEdge,
}
