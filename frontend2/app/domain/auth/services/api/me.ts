import type { User } from '@/shared/models/user'
import { fetchExtended, type ApiResponse } from '@/shared/services'

export const me = async () => {
  const response = await fetchExtended<ApiResponse<User>>(
    `${import.meta.env.VITE_BASE_PATH}/auth/me`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
  )

  return response.body.data
}
