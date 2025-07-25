import type { ModelNode } from '@/models/node'
import { fetchExtended, type ApiResponse } from '@/services'

export const updateNodes = async (
  projectId: number,
  flowId: number,
  nodes: ModelNode[],
) => {
  const response = await fetchExtended<ApiResponse<null>>(
    `${process.env.NEXT_PUBLIC_API_BASE_PATH}/projects/${projectId}/flows/${flowId}/nodes`,
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
