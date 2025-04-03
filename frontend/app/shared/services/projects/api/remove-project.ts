import { fetchExtended } from '../../lib/fetch'
import type { CustomResponse } from '../../types'

export const removeProject = async (id: number) => {
  const response = await fetchExtended<CustomResponse>(
    `${import.meta.env.VITE_BASE_PATH}/projects/${id}`,
    {
      method: 'DELETE',
    },
  )

  return response.body
}
