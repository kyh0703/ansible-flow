import { toModelNode } from '@/acl/node'
import type { ApiResponse } from '@/services/types'
import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import type { AppNode } from '@xyflow/react'
import { toast } from 'sonner'
import { updateNodes } from '..'

type Response = ApiResponse<null>
type Variables = {
  projectId: number
  flowId: number
  nodes: Partial<AppNode>[]
}
type MutationOptions = UseMutationOptions<
  Response,
  ApiResponse<null>,
  Variables
>

export const useUpdateNodes = (options?: MutationOptions) => {
  return useMutation<Response, ApiResponse<null>, Variables>({
    ...options,
    mutationFn: ({ projectId, flowId, nodes }) => {
      return updateNodes(
        projectId,
        flowId,
        nodes.map((node) => toModelNode(node as AppNode)),
      )
    },
    onSuccess: (data, variables, context) => {
      if (options?.onSuccess) {
        options?.onSuccess(data, variables, context)
      }
    },
    onError: (error, variables, context) => {
      toast.error(error.message)

      if (options?.onError) {
        options?.onError(error, variables, context)
      }
    },
  })
}
