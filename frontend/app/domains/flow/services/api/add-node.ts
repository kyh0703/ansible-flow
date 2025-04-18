import type { ModelNode } from '@/shared/models/node'
import { fetchExtended, type ApiResponse } from '@/shared/services'

export const addNode = async (node: Omit<ModelNode, 'id'>) => {
  const response = await fetchExtended<ApiResponse<number>>(
    `${import.meta.env.VITE_BASE_PATH}/nodes`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(node),
    },
  )

  return response.body.data
}
