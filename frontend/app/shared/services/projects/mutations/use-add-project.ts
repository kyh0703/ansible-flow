import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import type { Project } from '~/shared/models/project'
import type { CustomResponse } from '../../types'
import { addProject } from '../api'

type Response = { id: number; updateTime: Date }
type Variables = Omit<Project, 'id'>
type MutationOptions = UseMutationOptions<Response, CustomResponse, Variables>

export const useAddSubFlow = (options?: MutationOptions) => {
  return useMutation<Response, CustomResponse, Variables>({
    ...options,
    mutationFn: (subFlow) => {
      return addProject(subFlow)
    },
    onSuccess: (data, variables, context) => {
      if (options?.onSuccess) {
        options?.onSuccess(data, variables, context)
      }
      return data
    },
    onError: (error, variables, context) => {
      toast.error(error.message)

      if (options?.onError) {
        options?.onError(error, variables, context)
      }
    },
  })
}
