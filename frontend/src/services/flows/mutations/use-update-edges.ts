import { toModelEdge } from '@/acl/edge'
import type { ApiResponse } from '@/services/types'
import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import type { AppEdge } from '@xyflow/react'
import { toast } from 'sonner'
import { updateEdges } from '..'

type Response = ApiResponse<null>
type Variables = {
  projectId: number
  flowId: number
  edges: Partial<AppEdge>[]
}
type MutationOptions = UseMutationOptions<
  Response,
  ApiResponse<null>,
  Variables
>

export const useUpdateEdges = (options?: MutationOptions) => {
  return useMutation<Response, ApiResponse<null>, Variables>({
    ...options,
    mutationFn: ({ projectId, flowId, edges }) => {
      return updateEdges(
        projectId,
        flowId,
        edges.map((edge) => toModelEdge(edge as AppEdge)),
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
