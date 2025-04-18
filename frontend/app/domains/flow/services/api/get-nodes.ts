import type { ModelNode } from '@/shared/models/node'
import { fetchExtended, type ApiResponse } from '@/shared/services'

export const getNodes = async (flowId: number) => {
  const response = await fetchExtended<ApiResponse<ModelNode[]>>(
    `${import.meta.env.VITE_BASE_PATH}/flows/${flowId}/nodes`,
    {
      method: 'GET',
    },
  )

  return response.body.data
}
