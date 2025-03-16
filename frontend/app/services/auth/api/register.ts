import type { ApiResponse } from '~/services'
import { fetchExtended } from '~/services/lib/fetch'

export const register = async (data: {
  email: string
  password: string
  confirmPassword: string
  name: string
}) => {
  const response = await fetchExtended<
    ApiResponse<{ name: string; desc: string }[]>
  >(`${import.meta.env.VITE_BASE_PATH}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return response.body.data
}
