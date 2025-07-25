'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { me } from '@/services/auth'
import { useUserActions } from '@/stores/user-store'
import { setAccessToken } from '@/services'

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { setUser } = useUserActions()

  useEffect(() => {
    const token = searchParams.get('token')

    const setUserInfo = async () => {
      const user = await me()
      setUser(user)
    }

    if (token) {
      setAccessToken(token)
      setUserInfo()
      router.replace('/projects')
    } else {
      router.push('/')
    }
  }, [])

  return <div>인증 처리 중...</div>
}
