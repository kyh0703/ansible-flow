import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from '@tanstack/react-query'
import { toast } from 'react-toastify'
import type { Project } from '~/shared/models/project'
import type { CustomResponse } from '../../types'
import { updateProject } from '../api'
import { projectKey } from '../keys'

type Response = CustomResponse
type Variables = { id: number; data: Partial<Project> }
type MutationOptions = UseMutationOptions<Response, CustomResponse, Variables>

export const useUpdateProject = (options?: MutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation<Response, CustomResponse, Variables>({
    ...options,
    mutationFn: ({ id, data }) => {
      return updateProject(id, data)
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [projectKey.detail(variables.id)],
      })

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
