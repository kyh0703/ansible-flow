import { createStore } from '../lib/store'

interface ModalState {
  modal: Record<string, boolean>
  data: any
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

const useModal = () => useModalStore((state) => state.modal)

const useModalData = () => useModalStore((state) => state.data)

const useModalActions = () => useModalStore((state) => state.actions)

export { useModal, useModalData, useModalActions }
