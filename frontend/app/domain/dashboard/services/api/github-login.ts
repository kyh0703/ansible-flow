import { fetchExtended } from '@/shared/services'

export const githubLogin = async ({ redirectURL }: { redirectURL: string }) => {
  await fetchExtended(
    `${import.meta.env.VITE_BASE_PATH}/auth/github/login?redirectURL=${redirectURL}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}
