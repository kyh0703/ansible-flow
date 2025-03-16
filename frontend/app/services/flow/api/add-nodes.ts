import type { Node } from '@/models/node'
import { fetchExtended } from '@/services/lib/fetch'
import type { ApiResponse } from '@/services/types'

export const addNodes = async (flowId: number, data: Node[]) => {
  const response = await fetchExtended<ApiResponse<number[]>>(
    `${import.meta.env.VITE_BASE_PATH}/nodes/list/create`,
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
