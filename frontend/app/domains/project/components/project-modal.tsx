'use client'

import { useForm } from 'react-hook-form'
import { useModalId } from '@/shared/contexts/modal-context'
import { useModalActions, useModalData } from '@/shared/store/modal'
import { ModalContent } from '@/shared/components/modal'

type ModalData = {
  mode: 'create' | 'update'
}

export default function ProjectModal({
  onSubmit,
}: {
  onSubmit?: (data: ModalData) => void
}) {
  const id = useModalId()
  const modalData = useModalData()
  const { closeModal } = useModalActions()

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ModalData>()

  const handleCancelClick = () => {
    closeModal(id)
    reset()
  }

  const onSubmitModal = (data: ModalData) => {
    closeModal(id)
    reset()
    onSubmit?.(data)
  }

  return (
    <form>
      <ModalContent></ModalContent>
    </form>
  )
}
