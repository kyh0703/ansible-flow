import { fetchExtended, type ApiResponse } from '@/shared/services'

export const removeProject = async (id: string) => {
  const response = await fetchExtended<ApiResponse<null>>(
    `${import.meta.env.VITE_BASE_PATH}/projects/${id}`,
    {
      method: 'DELETE',
    },
  )

  return response.body
}
