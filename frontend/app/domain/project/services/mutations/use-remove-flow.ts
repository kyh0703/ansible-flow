import type { ApiResponse } from '@/shared/services'
import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { removeFlow } from '../api'

type Response = ApiResponse<null>
type Variables = { projectId: string; flowId: string }
type MutationOptions = UseMutationOptions<
  Response,
  ApiResponse<null>,
  Variables
>

export const useRemoveProject = (options?: MutationOptions) => {
  return useMutation<Response, ApiResponse<null>, Variables>({
    ...options,
    mutationFn: ({ projectId, flowId }) => {
      return removeFlow(projectId, flowId)
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
