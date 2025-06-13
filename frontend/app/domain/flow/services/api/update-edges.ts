import type { ModelEdge } from '@/shared/models/edge'
import { fetchExtended, type CustomResponse } from '@/shared/services'

export const updateEdges = async (
  projectId: number,
  flowId: number,
  edges: ModelEdge[],
) => {
  const response = await fetchExtended<CustomResponse>(
    `${import.meta.env.VITE_BASE_PATH}/projects/${projectId}/flows/${flowId}/edges`,
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
