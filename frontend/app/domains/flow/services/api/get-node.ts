import type { ModelNode } from '@/shared/models/node'
import { fetchExtended, type ApiResponse } from '@/shared/services'

export const getNode = async (id: number) => {
  const response = await fetchExtended<ApiResponse<ModelNode>>(
    `${import.meta.env.VITE_BASE_PATH}/nodes/${id}`,
    {
      method: 'GET',
    },
  )

  return response.body.data
}
