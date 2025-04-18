import type { ModelEdge } from '@/shared/models/edge'
import { fetchExtended, type ApiResponse } from '@/shared/services'

export const getEdge = async (id: number) => {
  const response = await fetchExtended<ApiResponse<ModelEdge>>(
    `${import.meta.env.VITE_BASE_PATH}/edges/${id}`,
    {
      method: 'GET',
    },
  )

  return response.body.data
}
