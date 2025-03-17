import type { ApiResponse } from '~/services'
import { fetchExtended } from '~/services/lib/fetch'
import type { Token } from '~/services/lib/token'

export const refresh = async () => {
  const response = await fetchExtended<ApiResponse<Token>>(
    `${import.meta.env.VITE_BASE_PATH}/auth/refresh`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  return response.body.data
}
