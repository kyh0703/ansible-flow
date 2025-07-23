import { useEffect } from 'react'
import { ModalAction, ModalContent } from './modal'
import { Button } from './ui/button'

type ConfirmModalProps = {
  content: string
  onClose?: (param: unknown) => void
}

export default function ConfirmModal({
  content,
  onClose,
}: Readonly<ConfirmModalProps>) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') onClose?.(true)
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
        <Button variant="destructive" onClick={() => onClose?.(false)}>
          Cancel
        </Button>
        <Button onClick={() => onClose?.(true)}>OK</Button>
      </ModalAction>
    </>
  )
}
