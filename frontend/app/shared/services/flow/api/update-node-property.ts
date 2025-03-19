import { fetchExtended } from '@/services/lib/fetch'
import { CustomResponse } from '@/services/types'

export const updateNodeProperty = async <T>(id: number, data: T) => {
  const response = await fetchExtended<CustomResponse>(
    `${import.meta.env.VITE_BASE_PATH}/nodeproperty/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data,
      }),
    },
  )

  return response.body
}
