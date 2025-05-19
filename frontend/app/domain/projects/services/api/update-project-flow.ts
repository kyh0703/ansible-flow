import type { Flow } from '@/shared/models/flow'
import { fetchExtended, type CustomResponse } from '@/shared/services'

export const updateProjectFlow = async (
  projectId: number,
  flowId: number,
  data: Partial<Flow>,
) => {
  const response = await fetchExtended<CustomResponse>(
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
