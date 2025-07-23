import type { ModelNode } from '@/models/node'
import { fetchExtended, type ApiResponse } from '@/services'

export const getNodes = async (flowId: number) => {
  const response = await fetchExtended<ApiResponse<ModelNode[]>>(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/flows/${flowId}/nodes`,
    {
      method: 'GET',
    },
  )

  return response.body.data
}
