import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import type { AppNode } from '@xyflow/react'
import { toast } from 'react-toastify'
import { addNodes } from '..'
import { toModelNode } from '../../utils'
import type { CustomResponse } from '@/shared/services'

type Response = number[]
type Variables = { flowId: number; nodes: AppNode[] }
type MutationOptions = UseMutationOptions<Response, CustomResponse, Variables>

export const useAddNodes = (options?: MutationOptions) => {
  return useMutation<Response, CustomResponse, Variables>({
    ...options,
    mutationFn: ({ flowId, nodes }) => {
      if (nodes.length === 0) {
        return Promise.resolve([])
      }
      return addNodes(
        flowId,
        nodes.map((node) => toModelNode(node)),
      )
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
