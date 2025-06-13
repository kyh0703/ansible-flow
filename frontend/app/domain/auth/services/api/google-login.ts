import { fetchExtended } from '@/shared/services'

export const googleLogin = async ({ redirectURL }: { redirectURL: string }) => {
  await fetchExtended(
    `${import.meta.env.VITE_BASE_PATH}/auth/google/login?redirectURL=${redirectURL}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}
