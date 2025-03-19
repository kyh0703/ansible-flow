import type { ApiResponse } from '~/shared/services'
import { fetchExtended } from '~/shared/services/lib/fetch'
import type { Token } from '~/shared/services/lib/token'

export const login = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const response = await fetchExtended<ApiResponse<Token>>(
    `${import.meta.env.VITE_BASE_PATH}/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    },
  )

  return response.body.data
}
