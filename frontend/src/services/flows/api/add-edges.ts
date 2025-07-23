import type { ModelEdge } from '@/models/edge'
import { fetchExtended, type ApiResponse } from '@/services'

export const addEdges = async (
  projectId: number,
  flowId: number,
  edges: ModelEdge[],
) => {
  const response = await fetchExtended<ApiResponse<number[]>>(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/projects/${projectId}/flows/${flowId}/edges`,
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
