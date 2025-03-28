import type { Node } from '@/models/node'
import { fetchExtended } from '@/services/lib/fetch'
import { CustomResponse } from '@/services/types'

export const updateNode = async (nodeId: number, data: Partial<Node>) => {
  const response = await fetchExtended<CustomResponse>(
    `${import.meta.env.VITE_BASE_PATH}/nodes/${nodeId}`,
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
