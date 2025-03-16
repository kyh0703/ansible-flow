import type { ApiResponse } from '~/services'
import { fetchExtended } from '~/services/lib/fetch'

export const login = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const response = await fetchExtended<
    ApiResponse<{ name: string; desc: string }[]>
  >(`${import.meta.env.VITE_BASE_PATH}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  return response.body.data
}
