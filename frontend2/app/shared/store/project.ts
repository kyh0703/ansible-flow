import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface ProjectState {
  search: string
  actions: {
    setSearch: (term: string) => void
  }
}

export const useProjectStore = create<ProjectState>()(
  devtools(
    immer((set) => ({
      search: '',
      actions: {
        setSearch: (term) =>
          set((state) => {
            state.search = term
          }),
      },
    })),
    { name: 'project' },
  ),
)
export const useProjectSearch = () => useProjectStore((state) => state.search)
export const useProjectActions = () => useProjectStore((state) => state.actions)
