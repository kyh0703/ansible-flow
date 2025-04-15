import type { ModelNode } from '~/shared/models/node'
import { fetchExtended, type CustomResponse } from '~/shared/services'

export const updateNode = async (id: number, node: Partial<ModelNode>) => {
  const response = await fetchExtended<CustomResponse>(
    `${import.meta.env.VITE_BASE_PATH}/nodes/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(node),
    },
  )

  return response.body
}
