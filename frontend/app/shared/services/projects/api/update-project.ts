import type { Project } from '~/shared/models/project'
import type { CustomResponse } from '../../types'
import { fetchExtended } from '../../lib/fetch'

export const updateProject = async (id: number, data: Partial<Project>) => {
  const response = await fetchExtended<CustomResponse>(
    `${import.meta.env.VITE_BASE_PATH}/projects/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  )

  return response.body
}
