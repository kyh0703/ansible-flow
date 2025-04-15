import type { ApiResponse } from '~/shared/services'
import { fetchExtended } from '~/shared/services/fetch'
import type { Token } from '~/shared/services/token'

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
