import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import type { CustomResponse } from '~/shared/services'
import { removeProject } from '../api'

type Response = CustomResponse
type Variables = number
type MutationOptions = UseMutationOptions<Response, CustomResponse, Variables>

export const useRemoveProject = (options?: MutationOptions) => {
  return useMutation<Response, CustomResponse, Variables>({
    ...options,
    mutationFn: (id) => {
      return removeProject(id)
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
