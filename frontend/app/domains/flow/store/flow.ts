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

type FlowState = {
  editMode: EditMode
  history: Record<number, History>
}

type FlowActions = {
  setEditMode: (mode: EditMode) => void
}

export const useFlowStore = createStore<FlowState & FlowActions>(
  (set) => ({
    editMode: 'grab',
    history: {},
    setEditMode: (mode: EditMode) =>
      set(
        (state) => {
          state.editMode = mode
        },
        false,
        'setEditMode',
      ),
  }),
  { name: 'FlowStore' },
)
