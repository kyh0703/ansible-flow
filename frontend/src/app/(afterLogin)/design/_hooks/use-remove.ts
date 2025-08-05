import logger from '@/lib/logger'
import { useReactFlow, type AppEdge, type AppNode } from '@xyflow/react'
import { useCallback } from 'react'
import { useNodeOperations } from './use-node-operations'

export function useRemove() {
  const { getNode, getNodes, getEdges, deleteElements } = useReactFlow<
    AppNode,
    AppEdge
  >()

  const { getSelectedNodes } = useNodeOperations()

  const canRemove = useCallback((): boolean => {
    return (
      getNodes().some((node) => node.selected) ||
      getEdges().some((edge) => edge.selected)
    )
  }, [getEdges, getNodes])

  const removeNodeById = useCallback(
    (nodeId: string) => {
      try {
        const node = getNode(nodeId)
        if (!node) return
        deleteElements({ nodes: [node] })
      } catch (error) {
        logger.error(error)
      }
    },
    [deleteElements, getNode],
  )

  const removeSelectedNodes = useCallback(() => {
    try {
      const selectedNodes = getSelectedNodes()
      if (selectedNodes.length === 0) return
      deleteElements({ nodes: selectedNodes })
    } catch (error) {
      logger.error(error)
    }
  }, [deleteElements, getSelectedNodes])

  return {
    canRemove,
    removeNodeById,
    removeSelectedNodes,
  }
}
