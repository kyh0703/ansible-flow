import { fetchExtended, type CustomResponse } from '@/shared/services'

export const removeProjectFlow = async (projectId: number, flowId: number) => {
  const response = await fetchExtended<CustomResponse>(
    `${import.meta.env.VITE_BASE_PATH}/projects/${projectId}/flows/${flowId}`,
    {
      method: 'DELETE',
    },
  )

  return response.body
}
