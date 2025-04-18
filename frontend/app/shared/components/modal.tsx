'use client'

import { useIsModalOpen, useModalActions } from '@/shared/store/modal'
import { XIcon } from 'lucide-react'
import { Suspense, useEffect, type PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'
import { ModalProvider } from '../contexts/modal-context'
import { cn } from '../lib/utils'
import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'

type ModalProps = {
  id: string
  title?: string
  className?: string
} & PropsWithChildren

const Modal = ({ id, title = '', className, children }: ModalProps) => {
  const isOpen = useIsModalOpen(id)
  const { closeModal } = useModalActions()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal(id)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [id, closeModal])

  return isOpen
    ? createPortal(
        <ModalProvider id={id}>
          <section className="bg-dialog-overlay animate-in fade-in-10 fixed top-0 left-0 z-30 flex h-full w-full items-center justify-center">
            <div
              className={cn(
                'w-2/6',
                'flex flex-col items-center justify-center gap-5',
                'bg-dialog text-dialog-foreground p-6',
                'rounded-sm',
                className,
              )}
            >
              <div className="flex w-full items-center justify-between">
                <h1 className={cn('font-poppins text-xl font-semibold')}>
                  {title}
                </h1>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => closeModal(id)}
                >
                  <XIcon size={20} />
                </Button>
              </div>
              <div className="w-full">
                <Suspense fallback={<Spinner />}>{children}</Suspense>
              </div>
            </div>
          </section>
        </ModalProvider>,
        document.body,
      )
    : null
}

const ModalContent = ({ children }: PropsWithChildren) => (
  <div className="z-10 h-full max-h-[440px] w-full overflow-y-scroll rounded-sm bg-[#F9F9F9] p-5 whitespace-pre-line dark:bg-[#272C31]">
    {children}
  </div>
)

const ModalAction = ({ children }: PropsWithChildren) => (
  <div className="mt-5 flex w-full justify-end gap-4">{children}</div>
)

export { Modal, ModalAction, ModalContent }
