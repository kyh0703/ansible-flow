import { fetchExtended } from '@/services/lib/fetch'
import { CustomResponse } from '@/services/types'

export const removeNode = async (nodeId: number) => {
  const response = await fetchExtended<CustomResponse>(
    `${import.meta.env.VITE_BASE_PATH}/nodes/${nodeId}`,
    {
      method: 'DELETE',
    },
  )

  return response.body
}
