import type { ApiResponse } from '@/services/types';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { removeEdges } from '../api/remove-edges';

type Response = ApiResponse<null>
type Variables = { projectId: number; flowId: number; edgeIds: number[] }
type MutationOptions = UseMutationOptions<
  Response,
  ApiResponse<null>,
  Variables
>

export const useRemoveEdges = (options?: MutationOptions) => {
  return useMutation<Response, ApiResponse<null>, Variables>({
    ...options,
    mutationFn: ({ projectId, flowId, edgeIds }) => {
      return removeEdges(projectId, flowId, edgeIds)
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
