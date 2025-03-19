import type { Node } from '@/models/node'
import { fetchExtended } from '@/services/lib/fetch'
import { CustomResponse } from '@/services/types'

export const updateNodes = async (data: Node[]) => {
  const response = await fetchExtended<CustomResponse>(
    `${import.meta.env.VITE_BASE_PATH}/nodes/list/update`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data,
      }),
    },
  )

  return response.body
}
