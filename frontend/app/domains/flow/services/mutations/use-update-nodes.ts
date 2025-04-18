import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import type { AppNode } from '@xyflow/react'
import { toast } from 'react-toastify'
import type { CustomResponse } from '@/shared/services'
import { updateNodes } from '..'
import { toModelNode } from '../../utils'

type Response = CustomResponse
type Variables = { flowId: number; nodes: Partial<AppNode>[] }
type MutationOptions = UseMutationOptions<Response, CustomResponse, Variables>

export const useUpdateNodes = (options?: MutationOptions) => {
  return useMutation<Response, CustomResponse, Variables>({
    ...options,
    mutationFn: ({ flowId, nodes }) => {
      return updateNodes(
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
