import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import type { AppNode } from '@xyflow/react'
import { toast } from 'react-toastify'
import { toModelNode } from '../../utils'
import { addNode } from '../api'
import type { CustomResponse } from '@/shared/services'

type Response = number
type Variables = AppNode
type MutationOptions = UseMutationOptions<Response, CustomResponse, Variables>

export const useAddNode = (options?: MutationOptions) => {
  return useMutation<Response, CustomResponse, Variables>({
    ...options,
    mutationFn: (node) => {
      return addNode(toModelNode(node))
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
