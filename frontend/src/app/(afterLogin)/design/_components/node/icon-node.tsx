'use client'

import type { IconButtonProps } from '@/components/icon'
import { cn } from '@/lib'
import {
  Handle,
  Position,
  useConnection,
  type CustomNodeProps,
} from '@xyflow/react'
import type { ComponentType } from 'react'
import { useNodeDimensions } from '../../_hooks'
import { StartIcon } from '../icon'

const withNodeIconStyle = (
  Icon: ComponentType<IconButtonProps>,
): ComponentType<CustomNodeProps> => {
  const WithIcon = ({ id, type, selected, data }: CustomNodeProps) => {
    const { label } = data
    const { width, height } = useNodeDimensions(id)
    const connection = useConnection()
    const isTarget = connection.inProgress && connection.fromNode.id !== id
    const targetHandleStyle = { zIndex: isTarget ? 3 : 1 }

    return (
      <div
        className={cn(
          'relative cursor-pointer outline-none',
          selected && 'outline-dashed',
        )}
        style={{ width, height }}
      >
        <div
          className={cn(
            'absolute',
            'flex items-center justify-center',
            'h-full w-full',
            'z-1',
          )}
        >
          {!connection.inProgress && (
            <Handle
              className="h-1/3! w-1/3! -translate-x-full! border-none! opacity-0!"
              style={{ zIndex: 2 }}
              position={Position.Right}
              type="source"
            />
          )}
          {(!connection.inProgress || isTarget) && (
            <Handle
              className="h-1/3! w-1/3! -translate-x-full! border-none! opacity-0!"
              style={targetHandleStyle}
              position={Position.Left}
              type="target"
              isConnectableStart={false}
            />
          )}
        </div>
        <div
          className={cn(
            'absolute top-0 left-0',
            'flex flex-col items-center justify-center',
            'h-full w-full',
          )}
        >
          <Icon className="rounded bg-gray-500" width={width} height={height} />
        </div>
        <div
          className="pointer-events-none absolute left-1/2 flex w-max max-w-[90px] -translate-x-1/2 transform flex-col items-center justify-center gap-1"
          style={{ top: height + 4 }}
        >
          <span className={cn('!text-xxs font-bold whitespace-nowrap')}>
            {type}
          </span>
          <p className="text-bs line-clamp-3 text-center break-all">{label}</p>
        </div>
      </div>
    )
  }

  return WithIcon
}

export const StartNode = withNodeIconStyle(StartIcon)
