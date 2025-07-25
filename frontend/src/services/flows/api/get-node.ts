import type { ModelNode } from '@/models/node'
import { fetchExtended, type ApiResponse } from '@/services'

export const getNode = async (
  projectId: number,
  flowId: number,
  nodeId: number,
) => {
  const response = await fetchExtended<ApiResponse<ModelNode>>(
    `${process.env.NEXT_PUBLIC_API_BASE_PATH}/projects/${projectId}/flows/${flowId}/nodes/${nodeId}`,
    {
      method: 'GET',
    },
  )

  return response.body.data
}
