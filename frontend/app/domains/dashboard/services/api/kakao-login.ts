import { fetchExtended } from '@/shared/services'

export const kakaoLogin = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  await fetchExtended(`${import.meta.env.VITE_BASE_PATH}/auth/kakao/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
}
