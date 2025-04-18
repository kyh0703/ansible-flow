import { fetchExtended, type ApiResponse, type Token } from '@/shared/services'

export const register = async (data: {
  email: string
  password: string
  confirmPassword: string
  name: string
}) => {
  const response = await fetchExtended<ApiResponse<Token>>(
    `${import.meta.env.VITE_BASE_PATH}/auth/register`,
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
