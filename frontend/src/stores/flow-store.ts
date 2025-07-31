import { createStore } from '@/lib/store'

export type CursorMode = 'grab' | 'pointer' | 'link'

interface FlowState {
  selectedNodeId: string | null
  cursorMode: CursorMode
  actions: {
    setCursorMode: (mode: CursorMode) => void
    setSelectedNodeId: (nodeId: string | null) => void
  }
}

const useFlowStore = createStore<FlowState>(
  (set) => ({
    selectedNodeId: null,
    cursorMode: 'grab',
    actions: {
      setCursorMode: (mode: CursorMode) =>
        set(
          (state) => {
            state.cursorMode = mode
          },
          false,
          'setCursorMode',
        ),
      setSelectedNodeId: (nodeId: string | null) =>
        set(
          (state) => {
            state.selectedNodeId = nodeId
          },
          false,
          'setSelectedNodeId',
        ),
    },
  }),
  { name: 'FlowStore' },
)

export const useSelectedNodeId = () =>
  useFlowStore((state) => state.selectedNodeId)
export const useCursor = () => useFlowStore((state) => state.cursorMode)
export const useFlowActions = () => useFlowStore((state) => state.actions)
