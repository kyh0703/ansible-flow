import ContextMenu from '@/components/context-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  useReactFlow,
  useStoreApi,
  type AppEdge,
  type AppNode,
} from '@xyflow/react'
import {
  AlignHorizontalSpaceAroundIcon,
  AlignVerticalSpaceAroundIcon,
  TrashIcon,
} from 'lucide-react'
import { useCallback } from 'react'

export type NodeContextMenuProps = {
  id: string
  mouse: {
    x: number
    y: number
  }
  onClick?: () => void
}

export function NodeContextMenu({ id, ...props }: NodeContextMenuProps) {
  const store = useStoreApi()

  const { getNode, getNodes, setNodes } = useReactFlow<AppNode, AppEdge>()
  const targetNode = getNode(id)!

  const selectedNodes = getNodes().filter((node) => node.selected)

  const handleDelete = useCallback(async () => {
    await removeNode(id)
  }, [removeNode, id])

  const handleAlign = useCallback(
    async (orientation: 'middle' | 'center') => {
      await alignNode(targetNode, selectedNodes, orientation)
    },
    [alignNode, selectedNodes, targetNode],
  )

  return (
    <ContextMenu left={props.mouse.x} top={props.mouse.y}>
      <DropdownMenu open={true} modal={false} onOpenChange={props.onClick}>
        <DropdownMenuTrigger />
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex gap-3 text-xs"
            disabled={
              targetNode.type === 'Start' || targetNode.type === 'Ghost'
            }
            onSelect={handleDelete}
          >
            <TrashIcon size={12} />
            Delete
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex gap-3 text-xs"
            disabled={!canAlignNode}
            onSelect={() => handleAlign('center')}
          >
            <AlignHorizontalSpaceAroundIcon size={12} />
            Align Center
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-3 text-xs"
            disabled={!canAlignNode}
            onSelect={() => handleAlign('middle')}
          >
            <AlignVerticalSpaceAroundIcon size={12} />
            Align Middle
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ContextMenu>
  )
}
