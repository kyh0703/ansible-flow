import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import type { AppEdge } from '@xyflow/react'
import { toast } from 'react-toastify'
import type { CustomResponse } from '~/shared/services'
import { updateEdge } from '..'
import { toModelEdge } from '../../utils'

type Response = CustomResponse
type Variables = { flowId: number; edges: Partial<AppEdge> }
type MutationOptions = UseMutationOptions<Response, CustomResponse, Variables>

export const useUpdateEdge = (options?: MutationOptions) => {
  return useMutation<Response, CustomResponse, Variables>({
    ...options,
    mutationFn: ({ flowId, edges }) => {
      return updateEdge(flowId, toModelEdge(edges as AppEdge))
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
