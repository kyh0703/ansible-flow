import {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from 'react'

type ModalState = {
  id: string
}

const ModalContext = createContext<ModalState | null>(null)

type ModalProviderProps = {
  id: string
} & PropsWithChildren

export const ModalProvider = ({ id, children }: ModalProviderProps) => {
  const value = useMemo(() => ({ id }), [id])

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export const useModalId = () => {
  const state = useContext(ModalContext)
  if (!state) {
    throw new Error('useModalId must be used within a ModalProvider')
  }
  return state?.id
}
