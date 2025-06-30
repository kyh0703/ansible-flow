import { fetchExtended, type ApiResponse } from '@/shared/services'

export const resetPassword = async (data: {
  token: string
  password: string
  passwordConfirm: string
}) => {
  const response = await fetchExtended<ApiResponse<null>>(
    `${import.meta.env.VITE_BASE_PATH}/auth/reset-password`,
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
