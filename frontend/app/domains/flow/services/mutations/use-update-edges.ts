import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import type { AppEdge } from '@xyflow/react'
import { toast } from 'react-toastify'
import { updateEdges } from '..'
import type { CustomResponse } from '@/shared/services'
import { toModelEdge } from '../../utils'

type Response = CustomResponse
type Variables = { flowId: number; edges: Partial<AppEdge>[] }
type MutationOptions = UseMutationOptions<Response, CustomResponse, Variables>

export const useUpdateEdges = (options?: MutationOptions) => {
  return useMutation<Response, CustomResponse, Variables>({
    ...options,
    mutationFn: ({ flowId, edges }) => {
      if (edges.length === 0) {
        return Promise.resolve()
      }
      return updateEdges(
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
