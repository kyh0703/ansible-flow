import type { User } from '@/shared/models/user'
import { fetchExtended, type ApiResponse } from '@/shared/services'

export interface UpdateUserRequest {
  name?: string
  bio?: string
  profileImage?: string
}

export const updateMe = async (userData: UpdateUserRequest) => {
  const response = await fetchExtended<ApiResponse<User>>(
    `${import.meta.env.VITE_BASE_PATH}/auth/me`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    },
  )

  return response.body.data
}
