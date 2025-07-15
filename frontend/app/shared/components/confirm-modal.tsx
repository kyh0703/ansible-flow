import { useEffect } from 'react'
import { Button } from '../ui/button'
import { ModalAction, ModalContent } from './modal'

type ConfirmModalProps = {
  content: string
  onClose?: (param: unknown) => void
}

export default function ConfirmModal({
  content,
  onClose,
}: Readonly<ConfirmModalProps>) {
  const handleOKClick = () => {
    onClose?.(true)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onClose?.(true)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <>
      <ModalContent>{content}</ModalContent>
      <ModalAction>
        <Button variant="destructive" onClick={close}>
          Cancel
        </Button>
        <Button onClick={handleOKClick}>OK</Button>
      </ModalAction>
    </>
  )
}
