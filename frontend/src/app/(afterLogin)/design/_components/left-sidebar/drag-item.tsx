'use client'

import type { CustomNodeType } from '@xyflow/react'

export function DragItem({
  type,
  icon,
}: Readonly<{
  type: CustomNodeType
  icon: React.ElementType
}>) {
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    nodeType: CustomNodeType,
  ) => {
    e.dataTransfer.setData('application/xyflow', nodeType)
    e.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div
      key={type}
      className="hover:bg-muted/50 flex cursor-grab items-center gap-2 rounded-md p-2 active:cursor-grabbing"
      draggable
      onDragStart={(e) => handleDragStart(e, type)}
    >
      <div className="h-3 w-3 rounded-full" />
      <span className="text-xs">{type}</span>
    </div>
  )
}
