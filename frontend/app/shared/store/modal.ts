import { createStore } from '../lib/store'

type ModalState = {
  modal: Record<string, boolean>
  data: any
}

type ModalActions = {
  openModal: (modal: string, data?: any) => void
  closeModal: (modal: string) => void
}

export const useModalStore = createStore<ModalState & ModalActions>(
  (set) => ({
    modal: {},
    data: null,
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
  }),
  { name: 'ModalStore' },
)
