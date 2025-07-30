import { fetchExtended, type ApiResponse } from '@/services'

export const removeEdges = async (
  projectId: string,
  flowId: string,
  removeIds: string[],
) => {
  const response = await fetchExtended<ApiResponse<null>>(
    `${process.env.NEXT_PUBLIC_API_BASE_PATH}/projects/${projectId}/flows/${flowId}/edges`,
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
