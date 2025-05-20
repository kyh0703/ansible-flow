import type { CustomResponse } from '@/shared/services'
import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import type { AppEdge } from '@xyflow/react'
import { toast } from 'react-toastify'
import { addEdges } from '..'
import { toModelEdge } from '../../utils'

type Response = number[]
type Variables = { projectId: number; flowId: number; edges: AppEdge[] }
type MutationOptions = UseMutationOptions<Response, CustomResponse, Variables>

export const useAddEdges = (options?: MutationOptions) => {
  return useMutation<Response, CustomResponse, Variables>({
    ...options,
    mutationFn: ({ projectId, flowId, edges }) => {
      return addEdges(
        projectId,
        flowId,
        edges.map((edge) => toModelEdge(edge)),
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
