import type { ModelNode } from '@/shared/models/node'
import { fetchExtended, type ApiResponse } from '@/shared/services'

export const getNode = async (
  projectId: number,
  flowId: number,
  nodeId: number,
) => {
  const response = await fetchExtended<ApiResponse<ModelNode>>(
    `${import.meta.env.VITE_BASE_PATH}/projects/${projectId}/flows/${flowId}/nodes/${nodeId}`,
    {
      method: 'GET',
    },
  )

  return response.body.data
}
