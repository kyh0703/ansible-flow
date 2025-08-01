import {
  BaseEdge,
  getSmoothStepPath,
  type CustomEdgeProps,
} from '@xyflow/react'

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
  const [path] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
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
