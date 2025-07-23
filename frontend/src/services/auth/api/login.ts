import { fetchExtended, type ApiResponse } from '@/services'

export const login = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const response = await fetchExtended<ApiResponse<string>>(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    },
  )

  return response.body.data
}
