import { fetchExtended, type ApiResponse } from '@/shared/services'

export const removeNodes = async (
  projectId: number,
  flowId: number,
  removeIds: number[],
) => {
  const response = await fetchExtended<ApiResponse<null>>(
    `${import.meta.env.VITE_BASE_PATH}/projects/${projectId}/flows/${flowId}/nodes`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(removeIds),
    },
  )

  return response.body
}
