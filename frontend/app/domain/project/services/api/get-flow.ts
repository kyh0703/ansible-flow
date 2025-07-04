import type { Flow } from '@/shared/models/flow'
import { fetchExtended, type ApiResponse } from '@/shared/services'

export const getFlow = async (projectId: string, flowId: string) => {
  const response = await fetchExtended<ApiResponse<Flow>>(
    `${import.meta.env.VITE_BASE_PATH}/projects/${projectId}/flows/${flowId}`,
    {
      method: 'GET',
    },
  )

  return response.body.data
}
