import type { Flow } from '@/shared/models/flow'
import type { Project } from '@/shared/models/project'
import { fetchExtended, type ApiResponse } from '@/shared/services'
import type { PaginationResponse } from '@/shared/types/pagination'

export const getProjects = async (pageParam = 1, pageSize = 10) => {
  const response = await fetchExtended<
    ApiResponse<PaginationResponse<Project>>
  >(
    `${import.meta.env.VITE_BASE_PATH}/projects?page=${pageParam}&pageSize=${pageSize}`,
    {
      method: 'GET',
    },
  )

  return response.body.data
}
