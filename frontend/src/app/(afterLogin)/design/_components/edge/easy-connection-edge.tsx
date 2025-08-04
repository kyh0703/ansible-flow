'use client'

import {
  BaseEdge,
  getStraightPath,
  useInternalNode,
  type CustomEdgeProps,
} from '@xyflow/react'
import { getEdgeParams } from '../../_utils'

export function EasyConnectionEdge({
  id,
  selected,
  source,
  sourceX,
  sourceY,
  sourcePosition,
  target,
  targetX,
  targetY,
  targetPosition,
  markerStart,
  markerEnd,
  style,
  data,
  selectable,
  deletable,
  sourceHandleId,
  targetHandleId,
  pathOptions,
  ...props
}: CustomEdgeProps) {
  const sourceNode = useInternalNode(source)
  const targetNode = useInternalNode(target)
  if (!sourceNode || !targetNode) return null

  const { sx, sy, tx, ty } = getEdgeParams(
    { x: sourceX, y: sourceY },
    { x: targetX, y: targetY },
  )

  const [edgePath] = getStraightPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
  })

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        {...props}
        markerStart={markerStart}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeDasharray: selected ? '5 5' : style?.strokeDasharray,
        }}
      />
    </>
  )
}
