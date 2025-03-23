// import {
//   useAlign,
//   useDetachNodes,
//   useNodes,
//   useRemove,
//   useUndoRedo,
// } from '@/hooks/xyflow'
// import { useFold } from '@/hooks/xyflow/use-fold'
// import { useAddNode, useUpdateNodes } from '@/services/subflow'
// import {
//   useReactFlow,
//   useStoreApi,
//   type AppEdge,
//   type AppNode,
// } from '@xyflow/react'
// import {
//   AlignHorizontalSpaceAroundIcon,
//   AlignVerticalSpaceAroundIcon,
//   TrashIcon,
// } from 'lucide-react'
// import { useCallback } from 'react'
// import ContextMenu from '../../../../../../_components/context-menu'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '~/shared/ui/dropdown-menu'

// export type NodeContextMenuProps = {
//   id: string
//   mouse: {
//     x: number
//     y: number
//   }
//   onClick?: () => void
// }

// export function NodeContextMenu({ id, ...props }: NodeContextMenuProps) {
//   const store = useStoreApi()

//   const { getNode, getNodes, setNodes } = useReactFlow<AppNode, AppEdge>()
//   const targetNode = getNode(id)!
//   const subFlowId = targetNode.data.subFlowId!

//   const { nodeFactory, getAllChildNodes, setBookmark } = useNodes()
//   const { saveHistory } = useUndoRedo(subFlowId)
//   const { removeNode } = useRemove(subFlowId)
//   const { fold, unfold } = useFold(subFlowId)
//   const { canAlignNode, alignNode } = useAlign(subFlowId)
//   const detachNodes = useDetachNodes(subFlowId)
//   const selectedNodes = getNodes().filter((node) => node.selected)

//   const { mutateAsync: addNodeMutate } = useAddNode()
//   const { mutateAsync: updateNodesMutate } = useUpdateNodes()

//   const handleDelete = useCallback(async () => {
//     await removeNode(id)
//   }, [removeNode, id])

//   const handleAlign = useCallback(
//     async (orientation: 'middle' | 'center') => {
//       await alignNode(targetNode, selectedNodes, orientation)
//     },
//     [alignNode, selectedNodes, targetNode],
//   )

//   return (
//     <ContextMenu left={props.mouse.x} top={props.mouse.y}>
//       <DropdownMenu open={true} modal={false} onOpenChange={props.onClick}>
//         <DropdownMenuTrigger />
//         <DropdownMenuContent>
//           <DropdownMenuItem
//             className="flex gap-3 text-xs"
//             disabled={
//               targetNode.type === 'Start' || targetNode.type === 'Ghost'
//             }
//             onSelect={handleDelete}
//           >
//             <TrashIcon size={12} />
//             Delete
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem
//             className="flex gap-3 text-xs"
//             disabled={!canAlignNode}
//             onSelect={() => handleAlign('center')}
//           >
//             <AlignHorizontalSpaceAroundIcon size={12} />
//             Align Center
//           </DropdownMenuItem>
//           <DropdownMenuItem
//             className="flex gap-3 text-xs"
//             disabled={!canAlignNode}
//             onSelect={() => handleAlign('middle')}
//           >
//             <AlignVerticalSpaceAroundIcon size={12} />
//             Align Middle
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </ContextMenu>
//   )
// }
