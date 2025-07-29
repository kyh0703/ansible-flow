import { createStore } from '@/lib/store'

export type CursorMode = 'grab' | 'pointer' | 'link'

interface FlowState {
  selectedNode: string | null
  cursorMode: CursorMode
  actions: {
    setCursorMode: (mode: CursorMode) => void
  }
}

const useFlowStore = createStore<FlowState>(
  (set) => ({
    selectedNode: null,
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
      setSelectedNode: (node: string | null) =>
        set((state) => {
          state.selectedNode = node
        }),
    },
  }),
  { name: 'FlowStore' },
)

export const useSelectedNode = () => useFlowStore((state) => state.selectedNode)
export const useCursor = () => useFlowStore((state) => state.cursorMode)
export const useFlowActions = () => useFlowStore((state) => state.actions)
