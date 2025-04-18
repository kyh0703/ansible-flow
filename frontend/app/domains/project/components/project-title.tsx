import { useModalActions } from '@/shared/store/modal'
import { Button } from '@/shared/ui/button'

export default function ProjectTitle() {
  const { openModal } = useModalActions()

  return (
    <div className="flex items-center justify-between p-4">
      <h1 className="text-lg font-bold">Project List</h1>
      <Button onClick={() => openModal('form-modal')}>New</Button>
    </div>
  )
}
