import type { Edge } from '@/models/edge'
import { fetchExtended } from '@/services/lib/fetch'
import { CustomResponse } from '@/services/types'

export const updateEdge = async (edgeId: number, data: Partial<Edge>) => {
  const response = await fetchExtended<CustomResponse>(
    `${import.meta.env.VITE_BASE_PATH}/edges/${edgeId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data,
      }),
    },
  )

  return response.body
}
