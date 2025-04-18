import type { Project } from '@/shared/models/project'
import { fetchExtended, type CustomResponse } from '@/shared/services'

export const updateProject = async (id: number, data: Partial<Project>) => {
  const response = await fetchExtended<CustomResponse>(
    `${import.meta.env.VITE_BASE_PATH}/projects/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  )

  return response.body
}
