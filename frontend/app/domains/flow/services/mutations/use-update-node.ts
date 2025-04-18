import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import type { AppNode } from '@xyflow/react'
import { toast } from 'react-toastify'
import type { CustomResponse } from '@/shared/services'
import { updateNode } from '..'
import { toModelNode } from '../../utils'

type Response = unknown
type Variables = { nodeId: number; node: Partial<AppNode> }
type MutationOptions = UseMutationOptions<Response, CustomResponse, Variables>

export const useUpdateNode = (options?: MutationOptions) => {
  return useMutation<Response, CustomResponse, Variables>({
    ...options,
    mutationFn: ({ nodeId, node }) => {
      return updateNode(nodeId, toModelNode(node as AppNode))
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
