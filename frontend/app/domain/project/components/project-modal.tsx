import FormInput from '@/shared/components/form-input'
import { ModalAction, ModalContent } from '@/shared/components/modal'
import type { Project } from '@/shared/models/project'
import { Button } from '@/shared/ui/button'
import { useForm } from 'react-hook-form'

type ProjectModalProps = {
  mode: 'create' | 'update'
  initialData?: Project
  onClose?: (param: unknown) => void
}

export default function ProjectModal({
  mode,
  initialData,
  onClose,
}: Readonly<ProjectModalProps>) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Project>({
    defaultValues: initialData ?? {
      name: '',
    },
  })

  const onSubmitModal = (project: Project) => {
    onClose?.({ mode, project })
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
              placeholder="Enter project name"
            />
            {errors.name && <p className="error-msg">{errors.name.message}</p>}
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
