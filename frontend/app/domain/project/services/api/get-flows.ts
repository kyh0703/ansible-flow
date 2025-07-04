import type { Flow } from '@/shared/models/flow'
import { fetchExtended, type ApiResponse } from '@/shared/services'
import type { PaginationResponse } from '@/shared/types/pagination'

export const getFlows = async (
  projectId: string,
  pageParam = 1,
  pageSize = 10,
) => {
  const response = await fetchExtended<ApiResponse<PaginationResponse<Flow>>>(
    `${import.meta.env.VITE_BASE_PATH}/projects/${projectId}/flows?page=${pageParam}&pageSize=${pageSize}`,
    {
      method: 'GET',
    },
  )

  return response.body.data
}
