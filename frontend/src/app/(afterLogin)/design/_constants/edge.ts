import { type EdgeTypes } from '@xyflow/react'

export enum Algorithm {
  Linear = 'linear',
  CatmullRom = 'catmull-rom',
  BezierCatmullRom = 'bezier-catmull-rom',
}

export const defaultAlgorithm = Algorithm.Linear

export const edgeTypes: EdgeTypes = {}
