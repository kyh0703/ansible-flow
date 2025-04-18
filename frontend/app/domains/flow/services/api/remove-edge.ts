import { fetchExtended, type CustomResponse } from '@/shared/services'

export const removeEdge = async (id: number) => {
  const response = await fetchExtended<CustomResponse>(
    `${import.meta.env.VITE_BASE_PATH}/edges/${id}`,
    {
      method: 'DELETE',
    },
  )

  return response.body
}
