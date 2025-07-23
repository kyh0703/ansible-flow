import type { ModelEdge } from '@/shared/models/edge'
import type { ModelNode } from '@/shared/models/node'
import { fetchExtended, type ApiResponse } from '@/shared/services'

export const getStructure = async (projectId: number, flowId: number) => {
  const response = await fetchExtended<
    ApiResponse<{
      nodes: ModelNode[]
      edges: ModelEdge[]
    }>
  >(
    `${import.meta.env.VITE_BASE_PATH}/projects/${projectId}/flows/${flowId}/structure`,
    {
      method: 'GET',
    },
  )

  return response.body.data
}
