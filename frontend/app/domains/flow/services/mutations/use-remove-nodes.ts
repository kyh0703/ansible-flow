import type { CustomResponse } from '@/shared/services'
import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { removeNodes } from '..'

type Response = CustomResponse
type Variables = { projectId: number; flowId: number; nodeIds: number[] }
type MutationOptions = UseMutationOptions<Response, CustomResponse, Variables>

export const useRemoveNodes = (options?: MutationOptions) => {
  return useMutation<Response, CustomResponse, Variables>({
    ...options,
    mutationFn: ({ projectId, flowId, nodeIds }) => {
      return removeNodes(projectId, flowId, nodeIds)
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
