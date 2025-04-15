import { fetchExtended, type CustomResponse } from '~/shared/services'

export const removeEdges = async (flowId: number, removeIds: number[]) => {
  const response = await fetchExtended<CustomResponse>(
    `${import.meta.env.VITE_BASE_PATH}/flows/${flowId}/edges/delete`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(removeIds),
    },
  )

  return response.body
}
