import type { ModelEdge } from '@/shared/models/edge'
import { fetchExtended, type ApiResponse } from '@/shared/services'

export const addEdges = async (flowId: number, edges: ModelEdge[]) => {
  const response = await fetchExtended<ApiResponse<number[]>>(
    `${import.meta.env.VITE_BASE_PATH}/flows/${flowId}/edges`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(edges),
    },
  )

  return response.body.data
}
