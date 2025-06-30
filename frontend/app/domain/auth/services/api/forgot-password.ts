import { fetchExtended, type ApiResponse } from '@/shared/services'

export const forgotPassword = async (data: { email: string }) => {
  const response = await fetchExtended<ApiResponse<null>>(
    `${import.meta.env.VITE_BASE_PATH}/auth/forgot-password`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    },
  )

  return response.body.data
}
