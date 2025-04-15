import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import type { CustomResponse } from '~/shared/services'
import { removeNode } from '..'

type Response = CustomResponse
type Variables = number
type MutationOptions = UseMutationOptions<Response, CustomResponse, Variables>

export const useRemoveNode = (options?: MutationOptions) => {
  return useMutation<Response, CustomResponse, Variables>({
    ...options,
    mutationFn: (nodeId) => {
      return removeNode(nodeId)
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
