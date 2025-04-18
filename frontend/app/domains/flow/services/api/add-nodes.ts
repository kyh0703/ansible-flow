import type { ModelNode } from '@/shared/models/node'
import { fetchExtended, type ApiResponse } from '@/shared/services'

export const addNodes = async (flowId: number, nodes: ModelNode[]) => {
  const response = await fetchExtended<ApiResponse<number[]>>(
    `${import.meta.env.VITE_BASE_PATH}/flows/${flowId}/nodes`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nodes),
    },
  )

  return response.body.data
}
