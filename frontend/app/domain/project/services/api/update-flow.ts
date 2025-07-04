import type { Flow } from '@/shared/models/flow'
import { fetchExtended, type ApiResponse } from '@/shared/services'

export const updateFlow = async (
  projectId: string,
  flowId: string,
  data: Partial<Flow>,
) => {
  const response = await fetchExtended<ApiResponse<Flow>>(
    `${import.meta.env.VITE_BASE_PATH}/projects/${projectId}/flows/${flowId}`,
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
