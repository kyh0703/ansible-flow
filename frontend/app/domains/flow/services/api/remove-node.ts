import { fetchExtended, type CustomResponse } from '@/shared/services'

export const removeNode = async (id: number) => {
  const response = await fetchExtended<CustomResponse>(
    `${import.meta.env.VITE_BASE_PATH}/nodes/${id}`,
    {
      method: 'DELETE',
    },
  )

  return response.body
}
