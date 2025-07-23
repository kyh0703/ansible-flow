import type { ModelEdge } from '@/shared/models/edge'
import { fetchExtended, type ApiResponse } from '@/shared/services'

export const getEdge = async (
  projectId: number,
  flowId: number,
  edgeId: number,
) => {
  const response = await fetchExtended<ApiResponse<ModelEdge>>(
    `${import.meta.env.VITE_BASE_PATH}/projects/${projectId}/flows/${flowId}/edges/${edgeId}`,
    {
      method: 'GET',
    },
  )

  return response.body.data
}
