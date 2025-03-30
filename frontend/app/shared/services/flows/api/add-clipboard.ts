import { fetchExtended } from '~/shared/services/lib/fetch'
import { type CustomResponse } from '~/shared/services/types'

export const addClipboard = async (data: {
  ip: string
  type: 'cut' | 'copy'
  nodes: { id: number }[]
  edges: { id: number }[]
}) => {
  const response = await fetchExtended<CustomResponse>(
    `${import.meta.env.VITE_BASE_PATH}/edits/clipboard/node`,
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
