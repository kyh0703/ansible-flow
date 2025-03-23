import type { CustomNodeType, Viewport } from '@xyflow/react'
import { createStore } from '~/shared/lib/store'

export type EditMode = 'grab' | 'pointer' | 'link'

export type SelectedNode = {
  projectId: number
  databaseId: number
  nodeId: string
  nodeType: CustomNodeType
}

type History = {
  selectedNode: SelectedNode | null
  viewPort: Viewport | null
}

interface FlowState {
  editMode: EditMode
  history: Record<number, History>
  actions: {
    setEditMode: (mode: EditMode) => void
  }
}

const useFlowStore = createStore<FlowState>(
  (set) => ({
    editMode: 'grab',
    history: {},
    actions: {
      setEditMode: (mode: EditMode) =>
        set(
          (state) => {
            state.editMode = mode
          },
          false,
          'setEditMode',
        ),
    },
  }),
  { name: 'FlowStore' },
)

const useEditMode = () => useFlowStore((state) => state.editMode)

const useHistory = (projectId: number) =>
  useFlowStore(
    (state) =>
      state.history[projectId] || { selectedNode: null, viewPort: null },
  )

const useFlowActions = () => useFlowStore((state) => state.actions)

export { useEditMode, useFlowActions, useHistory }
