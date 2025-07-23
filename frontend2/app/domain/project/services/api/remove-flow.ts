import { fetchExtended, type ApiResponse } from '@/shared/services'

export const removeFlow = async (projectId: string, flowId: string) => {
  const response = await fetchExtended<ApiResponse<null>>(
    `${import.meta.env.VITE_BASE_PATH}/projects/${projectId}/flows/${flowId}`,
    {
      method: 'DELETE',
    },
  )

  return response.body
}
