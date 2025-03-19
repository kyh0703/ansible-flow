import { fetchExtended } from '@/services/lib/fetch'
import { CustomResponse } from '@/services/types'

export const removeEdge = async (edgeId: number) => {
  const response = await fetchExtended<CustomResponse>(
    `${import.meta.env.VITE_BASE_PATH}/edges/${edgeId}`,
    {
      method: 'DELETE',
    },
  )

  return response.body
}
