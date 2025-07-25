import type { ModelEdge } from '@/models/edge'
import { fetchExtended, type ApiResponse } from '@/services'

export const updateEdges = async (
  projectId: number,
  flowId: number,
  edges: ModelEdge[],
) => {
  const response = await fetchExtended<ApiResponse<null>>(
    `${process.env.NEXT_PUBLIC_API_BASE_PATH}/projects/${projectId}/flows/${flowId}/edges`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(edges),
    },
  )

  return response.body
}
