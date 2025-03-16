import { fetchExtended } from '@/services/lib/fetch'
import { CustomResponse } from '@/services/types'

export const removeFlow = async (flowId: number) => {
  const response = await fetchExtended<CustomResponse>(
    `${import.meta.env.VITE_BASE_PATH}/flows/${flowId}`,
    {
      method: 'DELETE',
    },
  )

  return response.body
}
