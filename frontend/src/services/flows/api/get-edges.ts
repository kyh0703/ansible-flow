import type { ModelEdge } from '@/models/edge'
import { fetchExtended, type ApiResponse } from '@/services'

export const getEdges = async (flowId: number) => {
  const response = await fetchExtended<ApiResponse<ModelEdge[]>>(
    `${process.env.NEXT_PUBLIC_API_BASE_PATH}/flows/${flowId}/edges`,
    {
      method: 'GET',
    },
  )

  return response.body.data
}
