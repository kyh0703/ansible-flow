import type { Flow } from '@/shared/models/flow'
import { Button } from '@/shared/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { formatRelativeTime } from '@/shared/utils/date'
import { CornerDownLeft, Edit, Star, Trash2, Workflow } from 'lucide-react'
import { overlay } from 'overlay-kit'
import { Link } from 'react-router'
import { useRemoveFlow } from '../services/mutations/use-remove-flow'
import { useUpdateFlow } from '../services/mutations/use-update-flow'
import { cn } from '@/shared/lib'
import FlowModal from './flow-modal'
import { Modal } from '@/shared/components/modal'
import ConfirmModal from '@/shared/components/confirm-modal'

type FlowCardProps = {
  flow: Flow
}

export default function FlowCard({ flow }: Readonly<FlowCardProps>) {
  const updateFlowMutation = useUpdateFlow()
  const removeFlowMutation = useRemoveFlow()

  const handleStarToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    updateFlowMutation.mutate({
      projectId: flow.projectId,
      flowId: flow.id,
      data: { starred: !flow.starred },
    })
  }

  const handleEditClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const result = await overlay.openAsync(({ isOpen, close, unmount }) => {
      return (
        <Modal isOpen={isOpen} title="Edit Flow" onExit={unmount}>
          <ConfirmModal content={'정말로 삭제하시겠습니까?'} onClose={close} />
        </Modal>
      )
    })
    if (!result) return
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    overlay.open(({ isOpen, close }) => {
      const handleDeleteConfirm = () => {
        removeFlowMutation.mutate({
          projectId: flow.projectId.toString(),
          flowId: flow.id.toString(),
        })
        close()
      }

      return (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-200 ${
            isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={close}
          />
          <div
            className={`bg-card border-border relative mx-4 w-full max-w-md rounded-lg border p-6 shadow-lg transition-all duration-200 ${
              isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
          >
            <div className="mb-4">
              <h2 className="mb-2 text-lg font-semibold">플로우 삭제</h2>
              <p className="text-muted-foreground text-sm">
                '{flow.name}' 플로우를 정말 삭제하시겠습니까?
                <br />이 작업은 되돌릴 수 없습니다.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={close}
                disabled={removeFlowMutation.isPending}
              >
                취소
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteConfirm}
                disabled={removeFlowMutation.isPending}
              >
                {removeFlowMutation.isPending ? '삭제 중...' : '삭제'}
              </Button>
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <Card className="group border-border/50 bg-card/50 hover:border-border relative flex h-full flex-col overflow-hidden border backdrop-blur-sm transition-all duration-200 hover:shadow-lg hover:shadow-black/5">
      <div className="from-primary/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      <CardHeader className="relative space-y-0 p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-200/20 bg-gradient-to-br from-blue-500/10 to-blue-600/5">
              <Workflow className="h-5 w-5 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="truncate text-base leading-none font-semibold">
                {flow.name}
              </CardTitle>
              <div className="text-muted-foreground mt-1 text-xs">
                {flow.updatedAt
                  ? formatRelativeTime(flow.updatedAt)
                  : '시간 정보 없음'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'h-8 w-8 cursor-pointer p-0 transition-all duration-200',
                'text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-blue-500',
              )}
              onClick={handleEditClick}
              disabled={updateFlowMutation.isPending}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'h-8 w-8 cursor-pointer p-0 transition-all duration-200',
                'text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-red-500',
              )}
              onClick={handleDeleteClick}
              disabled={removeFlowMutation.isPending}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'h-8 w-8 cursor-pointer p-0 transition-all duration-200',
                flow.starred
                  ? 'text-yellow-500 hover:text-yellow-600'
                  : 'text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-yellow-500',
              )}
              onClick={handleStarToggle}
              disabled={updateFlowMutation.isPending}
            >
              <Star
                className={`h-4 w-4 transition-all duration-200 ${
                  flow.starred ? 'fill-current' : ''
                }`}
              />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-4 pt-0">
        <CardDescription className="line-clamp-2 text-sm leading-relaxed">
          {flow.description || '플로우 설명이 없습니다'}
        </CardDescription>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-muted-foreground text-xs">활성</span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-primary hover:text-primary/80 hover:bg-primary/10 z-10 h-8 w-8 cursor-pointer p-0 opacity-0 transition-all duration-200 group-hover:opacity-100"
          >
            <Link to={`/projects/${flow.projectId}/flows/${flow.id}`}>
              <CornerDownLeft className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
