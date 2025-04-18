import type { Project } from '@/shared/models/project'
import { fetchExtended, type ApiResponse } from '@/shared/services'

export const getProjects = async () => {
  const response = await fetchExtended<ApiResponse<Project[]>>(
    `${import.meta.env.VITE_BASE_PATH}/projects`,
    {
      method: 'GET',
    },
  )

  return response.body.data
}
