import { fetchExtended, type ApiResponse, type Token } from '@/shared/services'

export const resetPassword = async (data: { email: string }) => {
  const response = await fetchExtended<ApiResponse<Token>>(
    `${import.meta.env.VITE_BASE_PATH}/auth/reset-password`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  )

  return response.body.data
}
