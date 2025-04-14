import { createStore } from '../lib/store'

type ModalState = {
  modal: Record<string, boolean>
  data: unknown
  actions: {
    openModal: (modal: string, data?: any) => void
    closeModal: (modal: string) => void
  }
}

const useModalStore = createStore<ModalState>(
  (set) => ({
    modal: {},
    data: null,
    actions: {
      openModal: (modal, data) =>
        set((state) => {
          state.modal[modal] = true
          state.data = data
        }),
      closeModal: (modal) =>
        set((state) => {
          state.modal[modal] = false
          state.data = null
        }),
    },
  }),
  { name: 'ModalStore' },
)

export const useIsModalOpen = (id: string) =>
  useModalStore((state) => state.modal[id] || false)
export const useModalData = () => useModalStore((state) => state.data)
export const useModalActions = () => useModalStore((state) => state.actions)
