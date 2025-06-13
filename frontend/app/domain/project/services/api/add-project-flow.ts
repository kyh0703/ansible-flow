import type { Flow } from '@/shared/models/flow'
import { fetchExtended, type ApiResponse } from '@/shared/services'

export const addProjectFlow = async (
  projectId: number,
  flow: Omit<Flow, 'id'>,
) => {
  const response = await fetchExtended<
    ApiResponse<{ id: number; updateTime: Date }>
  >(`${import.meta.env.VITE_BASE_PATH}/projects/${projectId}/flows`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(flow),
  })

  return response.body.data
}
