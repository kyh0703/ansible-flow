import { fetchExtended, type CustomResponse } from '@/shared/services'

export const removeEdges = async (
  projectId: number,
  flowId: number,
  removeIds: number[],
) => {
  const response = await fetchExtended<CustomResponse>(
    `${import.meta.env.VITE_BASE_PATH}/projects/${projectId}/flows/${flowId}/edges`,
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
