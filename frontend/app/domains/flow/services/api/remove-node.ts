import { fetchExtended, type CustomResponse } from '@/shared/services'

export const removeNode = async (
  projectId: number,
  flowId: number,
  nodeId: number,
) => {
  const response = await fetchExtended<CustomResponse>(
    `${import.meta.env.VITE_BASE_PATH}/projects/${projectId}/flows/${flowId}/nodes/${nodeId}`,
    {
      method: 'DELETE',
    },
  )

  return response.body
}
