import type { ModelEdge } from '@/models/edge'
import type { ModelNode } from '@/models/node'
import { fetchExtended, type ApiResponse } from '@/services'

export const getStructure = async (projectId: string, flowId: string) => {
  const response = await fetchExtended<
    ApiResponse<{
      nodes: ModelNode[]
      edges: ModelEdge[]
    }>
  >(
    `${process.env.NEXT_PUBLIC_API_BASE_PATH}/projects/${projectId}/flows/${flowId}/structure`,
    {
      method: 'GET',
    },
  )

  return response.body.data
}
