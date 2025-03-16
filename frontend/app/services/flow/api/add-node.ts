import type { Node } from '@/models/node'
import { fetchExtended } from '@/services/lib/fetch'
import type { ApiResponse } from '@/services/types'

export const addNode = async (flowId: number, data: Omit<Node, 'id'>) => {
  const response = await fetchExtended<ApiResponse<number>>(
    `${import.meta.env.VITE_BASE_PATH}/nodes`,
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
