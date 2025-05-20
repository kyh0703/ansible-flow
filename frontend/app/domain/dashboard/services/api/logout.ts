import { fetchExtended, type ApiResponse, type Token } from '@/shared/services'

export const logout = async () => {
  const response = await fetchExtended<ApiResponse<Token>>(
    `${import.meta.env.VITE_BASE_PATH}/auth/logout`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  return response.body.data
}
