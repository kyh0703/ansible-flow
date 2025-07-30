import {
  useReactFlow,
  type AppEdge,
  type AppNode,
  type CustomNodeType,
  type XYPosition,
} from '@xyflow/react'
import { useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'

export function useNodeOperations() {
  const { setNodes } = useReactFlow<AppNode, AppEdge>()

  const nodeFactory = useCallback(
    (position: XYPosition, type: CustomNodeType) => {
      const newNode: AppNode = {
        id: uuidv4(),
        position,
        zIndex: 0,
        type,
        data: {
          label: '',
        },
      }

      return newNode
    },
    [],
  )

  const setLabel = useCallback((id: string, label: string) => {
    setNodes((nodes) => {
      return nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, label } } : node,
      )
    })
  }, [])

  return {
    nodeFactory,
    setLabel,
  }
}
