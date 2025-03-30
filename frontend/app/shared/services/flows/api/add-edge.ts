import type { Edge } from '@/models/edge'
import { fetchExtended } from '@/services/lib/fetch'
import { ApiResponse } from '@/services/types'

export const addEdge = async (flowId: number, data: Omit<Edge, 'id'>) => {
  const response = await fetchExtended<ApiResponse<{ id: number }>>(
    `${import.meta.env.VITE_BASE_PATH}/edges`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        flowId,
        data,
      }),
    },
  )

  return response.body.data
}
