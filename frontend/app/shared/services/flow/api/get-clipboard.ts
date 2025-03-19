import type { Edge } from '@/models/edge'
import type { Node } from '@/models/node'
import type { ApiResponse } from '@/services'
import { fetchExtended } from '@/services/lib/fetch'

export const getClipboard = async (ip: string) => {
  const response = await fetchExtended<
    ApiResponse<{
      type: 'cut' | 'copy'
      nodes: Node[]
      edges: Edge[]
    }>
  >(`${import.meta.env.VITE_BASE_PATH}/edits/clipboard/node/recv`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ip,
    }),
  })

  return response.body.data
}
