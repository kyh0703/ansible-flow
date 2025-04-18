import type { ModelEdge } from '@/shared/models/edge'
import { fetchExtended, type CustomResponse } from '@/shared/services'

export const updateEdge = async (id: number, edge: Partial<ModelEdge>) => {
  const response = await fetchExtended<CustomResponse>(
    `${import.meta.env.VITE_BASE_PATH}/edges/${id}`,
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
