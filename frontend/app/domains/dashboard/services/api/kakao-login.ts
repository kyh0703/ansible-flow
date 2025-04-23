import { fetchExtended } from '@/shared/services'

export const kakaoLogin = async ({ redirectURL }: { redirectURL: string }) => {
  await fetchExtended(
    `${import.meta.env.VITE_BASE_PATH}/auth/kakao/login?redirect-url=${redirectURL}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}
