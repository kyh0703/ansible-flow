import type { ModelEdge } from '@/shared/models/edge'
import { fetchExtended, type ApiResponse } from '@/shared/services'

export const addEdge = async (
  projectId: number,
  flowId: number,
  edge: Omit<ModelEdge, 'id'>,
) => {
  const response = await fetchExtended<ApiResponse<number>>(
    `${import.meta.env.VITE_BASE_PATH}/projects/${projectId}/flows/${flowId}/edges`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(edge),
    },
  )

  return response.body.data
}
