import FormInput from '@/shared/components/form-input'
import { ModalAction, ModalContent } from '@/shared/components/modal'
import { useModalId } from '@/shared/contexts/modal-context'
import { useModalActions, useModalData } from '@/shared/store/modal'
import { Button } from '@/shared/ui/button'
import { useForm } from 'react-hook-form'

interface Flow {
  id?: number
  name: string
  description: string
}

type ModalData = {
  mode: 'create' | 'update'
  data?: Flow
}

export default function FlowModal({
  onSubmit,
}: Readonly<{
  onSubmit?: (mode: 'create' | 'update', data: Flow) => void
}>) {
  const id = useModalId()
  const modalData = useModalData() as ModalData
  const { closeModal } = useModalActions()

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Flow>({
    defaultValues: modalData?.data || {
      name: '',
      description: '',
    },
  })

  const handleCancelClick = () => {
    closeModal(id)
    reset()
  }

  const onSubmitModal = (flow: Flow) => {
    closeModal(id)
    reset()
    onSubmit?.(modalData.mode, flow)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitModal)}>
      <ModalContent>
        <div className="space-y-6">
          <div className="space-y-3">
            <h3>Name</h3>
            <FormInput
              control={control}
              name="name"
              placeholder="Enter flow name"
            />
            {errors.name && <p className="error-msg">{errors.name.message}</p>}
            <h3>Description</h3>
            <FormInput
              control={control}
              name="description"
              placeholder="Enter flow description"
            />
            {errors.description && (
              <p className="error-msg">{errors.description.message}</p>
            )}
          </div>
        </div>
      </ModalContent>
      <ModalAction>
        <Button variant="destructive" onClick={handleCancelClick}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </ModalAction>
    </form>
  )
}
