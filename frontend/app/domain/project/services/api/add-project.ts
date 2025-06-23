import type { Project } from '@/shared/models/project'
import { fetchExtended, type ApiResponse } from '@/shared/services'

export const addProject = async (project: Omit<Project, 'id'>) => {
  const response = await fetchExtended<
    ApiResponse<{ id: string; updateTime: Date }>
  >(`${import.meta.env.VITE_BASE_PATH}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  })

  return response.body.data
}
