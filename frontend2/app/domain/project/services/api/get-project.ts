import type { Project } from '@/shared/models/project'
import { fetchExtended, type ApiResponse } from '@/shared/services'

export const getProject = async (id: string) => {
  const response = await fetchExtended<ApiResponse<Project>>(
    `${import.meta.env.VITE_BASE_PATH}/projects/${id}`,
    {
      method: 'GET',
    },
  )

  return response.body.data
}
