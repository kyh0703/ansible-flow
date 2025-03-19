import { fetchExtended } from '@/services/lib/fetch'
import type { ApiResponse } from '@/services/types'

export const getNodeProperty = async <T>(id: number) => {
  const response = await fetchExtended<
    ApiResponse<{
      property: T
      updateTime: Date
    }>
  >(`${import.meta.env.VITE_BASE_PATH}/nodeproperty/${id}`, {
    method: 'GET',
  })

  return response.body.data
}
