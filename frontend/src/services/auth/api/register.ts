import { fetchExtended, type ApiResponse } from '@/services'

export const register = async (data: {
  email: string
  password: string
  passwordConfirm: string
  name: string
}) => {
  const response = await fetchExtended<ApiResponse<string>>(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/auth/register`,
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
