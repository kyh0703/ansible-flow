import type { Flow } from '@/shared/models/flow'
import { fetchExtended, type ApiResponse } from '@/shared/services'

export const getProjects = async (pageParam = 1, pageSize = 10) => {
  const response = await fetchExtended<
    ApiResponse<{
      items: Flow[]
      meta: {
        total: number
        skip: number
        take: number
        hasMore: boolean
        page: number
        totalPages: number
      }
    }>
  >(
    `${import.meta.env.VITE_BASE_PATH}/projects?page=${pageParam}&pageSize=${pageSize}`,
    {
      method: 'GET',
    },
  )

  return response.body.data
}
