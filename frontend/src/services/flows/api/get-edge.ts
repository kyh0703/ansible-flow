import type { ModelEdge } from '@/models/edge'
import { fetchExtended, type ApiResponse } from '@/services'

export const getEdge = async (
  projectId: number,
  flowId: number,
  edgeId: number,
) => {
  const response = await fetchExtended<ApiResponse<ModelEdge>>(
    `${process.env.NEXT_PUBLIC_API_BASE_PATH}/projects/${projectId}/flows/${flowId}/edges/${edgeId}`,
    {
      method: 'GET',
    },
  )

  return response.body.data
}
