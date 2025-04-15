import { fetchExtended, type CustomResponse } from '~/shared/services'

export const removeProject = async (id: number) => {
  const response = await fetchExtended<CustomResponse>(
    `${import.meta.env.VITE_BASE_PATH}/projects/${id}`,
    {
      method: 'DELETE',
    },
  )

  return response.body
}
