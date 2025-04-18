import type { ModelEdge } from '@/shared/models/edge'
import { fetchExtended, type ApiResponse } from '@/shared/services'

export const addEdge = async (edge: Omit<ModelEdge, 'id'>) => {
  const response = await fetchExtended<ApiResponse<number>>(
    `${import.meta.env.VITE_BASE_PATH}/edges`,
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
