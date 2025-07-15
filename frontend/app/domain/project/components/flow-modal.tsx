import FormInput from '@/shared/components/form-input'
import { ModalAction, ModalContent } from '@/shared/components/modal'
import type { Flow } from '@/shared/models/flow'
import { Button } from '@/shared/ui/button'
import { useForm } from 'react-hook-form'

type FlowModalProps = {
  initialData?: Flow
  onClose?: (param: unknown) => void
}

export default function FlowModal({
  initialData,
  onClose,
}: Readonly<FlowModalProps>) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Flow>({
    defaultValues: initialData ?? {
      name: '',
      description: '',
    },
  })

  const onSubmitModal = (flow: Flow) => {
    onClose?.(flow)
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
              placeholder="Enter Flow name"
            />
            {errors.name && <p className="error-msg">{errors.name.message}</p>}
          </div>
          <div className="space-y-3">
            <h3>Description</h3>
            <FormInput
              control={control}
              name="description"
              placeholder="Enter Flow description"
            />
            {errors.description && (
              <p className="error-msg">{errors.description.message}</p>
            )}
          </div>
        </div>
      </ModalContent>
      <ModalAction>
        <Button variant="destructive" onClick={() => onClose?.(null)}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </ModalAction>
    </form>
  )
}
