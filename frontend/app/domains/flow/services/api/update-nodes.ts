import type { ModelNode } from '@/shared/models/node'
import { fetchExtended, type CustomResponse } from '@/shared/services'

export const updateNodes = async (flowId: number, nodes: ModelNode[]) => {
  const response = await fetchExtended<CustomResponse>(
    `${import.meta.env.VITE_BASE_PATH}/flows/${flowId}/nodes`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nodes),
    },
  )

  return response.body
}
