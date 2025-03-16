import { fetchExtended } from '@/services/lib/fetch'
import type { ApiResponse } from '@/services/types'

export const getUndoRedoCount = async (flowId: number) => {
  const response = await fetchExtended<
    ApiResponse<{ undoCount: number; redoCount: number }>
  >(`${import.meta.env.VITE_BASE_PATH}/flows/history/${flowId}`, {
    method: 'GET',
  })

  return response.body.data
}
