import type { ModelEdge } from '@/shared/models/edge'
import { fetchExtended, type CustomResponse } from '@/shared/services'

export const updateEdge = async (
  projectId: number,
  flowId: number,
  edge: ModelEdge,
) => {
  const response = await fetchExtended<CustomResponse>(
    `${import.meta.env.VITE_BASE_PATH}/projects/${projectId}/flows/${flowId}/edges/${edge.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(edge),
    },
  )

  return response.body
}
