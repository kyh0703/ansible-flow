import type { Node } from '@/models/node'
import { fetchExtended } from '@/services/lib/fetch'
import type { ApiResponse } from '@/services/types'

export const getNode = async (nodeId: number) => {
  const response = await fetchExtended<ApiResponse<Node>>(
    `${import.meta.env.VITE_BASE_PATH}/nodes/${nodeId}`,
    {
      method: 'GET',
    },
  )

  return response.body.data
}
