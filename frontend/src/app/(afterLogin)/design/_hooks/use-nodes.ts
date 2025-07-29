import {
  useReactFlow,
  type AppEdge,
  type AppNode,
  type CustomNodeType,
  type XYPosition,
} from '@xyflow/react'
import { useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'

export function useNodesUtils() {
  const { getNode, getNodes } = useReactFlow<AppNode, AppEdge>()

  const nodeFactory = useCallback(
    (position: XYPosition, type: CustomNodeType) => {
      let newNode: AppNode = {
        id: uuidv4(),
        position,
        type,
        data: {
          label: '',
        },
      }

      return newNode
    },
    [],
  )
  return {
    nodeFactory,
  }
}
