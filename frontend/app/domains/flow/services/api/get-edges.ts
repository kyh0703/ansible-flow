import type { ModelEdge } from '~/shared/models/edge'
import { fetchExtended, type ApiResponse } from '~/shared/services'

export const getEdges = async (flowId: number) => {
  const response = await fetchExtended<ApiResponse<ModelEdge[]>>(
    `${import.meta.env.VITE_BASE_PATH}/flows/${flowId}/edges`,
    {
      method: 'GET',
    },
  )

  return response.body.data
}
