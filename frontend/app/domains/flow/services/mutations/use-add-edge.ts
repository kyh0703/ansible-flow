import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { type AppEdge } from '@xyflow/react'
import { toast } from 'react-toastify'
import { addEdge } from '..'
import { toModelEdge } from '../../utils'
import type { CustomResponse } from '@/shared/services'

type Response = number
type Variables = AppEdge
type MutationOptions = UseMutationOptions<Response, CustomResponse, Variables>

export const useAddEdge = (options?: MutationOptions) => {
  return useMutation<Response, CustomResponse, Variables>({
    ...options,
    mutationFn: (edge) => {
      return addEdge(toModelEdge(edge))
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
