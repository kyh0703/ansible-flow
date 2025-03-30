import { fetchExtended } from '@/services/lib/fetch'
import type { ApiResponse } from '@/services/types'

export const getNodePropertyClipboard = async <T>(ip: string) => {
  const response = await fetchExtended<
    ApiResponse<{
      type: 'cut' | 'copy'
      property: T[]
    }>
  >(`${import.meta.env.VITE_BASE_PATH}/edits/clipboard/property/recv`, {
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
