import { toModelNode } from '@/acl/node'
import type { ApiResponse } from '@/services'
import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import type { AppNode } from '@xyflow/react'
import { toast } from 'react-toastify'
import { addNodes } from '..'

type Response = number[]
type Variables = { projectId: number; flowId: number; nodes: AppNode[] }
type MutationOptions = UseMutationOptions<
  Response,
  ApiResponse<null>,
  Variables
>

export const useAddNodes = (options?: MutationOptions) => {
  return useMutation<Response, ApiResponse<null>, Variables>({
    ...options,
    mutationFn: ({ projectId, flowId, nodes }) => {
      return addNodes(
        projectId,
        flowId,
        nodes.map((node) => toModelNode(node)),
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
