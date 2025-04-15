import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import type { CustomResponse } from '~/shared/services'
import { removeEdges } from '../api/remove-edges'

type Response = unknown
type Variables = { flowId: number; removeIds: number[] }
type MutationOptions = UseMutationOptions<Response, CustomResponse, Variables>

export const useRemoveEdges = (options?: MutationOptions) => {
  return useMutation<Response, CustomResponse, Variables>({
    ...options,
    mutationFn: ({ flowId, removeIds }) => {
      return removeEdges(flowId, removeIds)
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
