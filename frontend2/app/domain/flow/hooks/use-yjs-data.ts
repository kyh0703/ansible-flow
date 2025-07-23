import type { AppEdge, AppNode } from '@xyflow/react'
import { useCallback, useMemo } from 'react'
import * as Y from 'yjs'
import type { Cursor } from '../types/collaboration'

export default function useYjsData(yDoc: Y.Doc) {
  const sharedCursorsMap = useMemo(
    () => yDoc.getMap<Y.Map<Cursor>>('cursors'),
    [yDoc],
  )
  const sharedNodesMap = useMemo(
    () => yDoc.getMap<Y.Map<AppNode>>('nodes'),
    [yDoc],
  )
  const sharedEdgesMap = useMemo(
    () => yDoc.getMap<Y.Map<AppEdge>>('edges'),
    [yDoc],
  )
  const sharedHistoryMap = useMemo(
    () => yDoc.getMap<{ undoCount: number; redoCount: number }>(`history`),
    [yDoc],
  )

  const getCursorsMap = useCallback(
    (subFlowId: number) => {
      if (!sharedCursorsMap.has('' + subFlowId)) {
        sharedCursorsMap.set('' + subFlowId, new Y.Map<Cursor>())
      }
      return sharedCursorsMap.get('' + subFlowId)!
    },
    [sharedCursorsMap],
  )

  const getNodesMap = useCallback(
    (subFlowId: number) => {
      if (!sharedNodesMap.has('' + subFlowId)) {
        sharedNodesMap.set('' + subFlowId, new Y.Map<AppNode>())
      }
      return sharedNodesMap.get('' + subFlowId)!
    },
    [sharedNodesMap],
  )

  const getEdgesMap = useCallback(
    (subFlowId: number) => {
      if (!sharedEdgesMap.has('' + subFlowId)) {
        sharedEdgesMap.set('' + subFlowId, new Y.Map<AppEdge>())
      }
      return sharedEdgesMap.get('' + subFlowId)!
    },
    [sharedEdgesMap],
  )

  const clearFlow = useCallback(
    (flowId: string) => {
      sharedCursorsMap.delete(flowId)
      const nodesMap = sharedNodesMap.get(flowId)
      sharedNodesMap.delete(flowId)
      sharedEdgesMap.delete(flowId)
      sharedHistoryMap.delete(flowId)
    },
    [sharedCursorsMap, sharedEdgesMap, sharedHistoryMap, sharedNodesMap],
  )

  return {
    sharedCursorsMap,
    sharedNodesMap,
    sharedEdgesMap,
    sharedHistoryMap,
    getCursorsMap,
    getNodesMap,
    getEdgesMap,
    clearFlow,
  }
}
