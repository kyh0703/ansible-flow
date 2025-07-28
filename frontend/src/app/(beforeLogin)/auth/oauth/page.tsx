'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { me } from '@/services/auth'
import { useUserActions } from '@/stores/user-store'
import { setAccessToken } from '@/services'
import { Spinner } from '@/components/ui/spinner'

export default function OAuthPage() {
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

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner size="lg" />
    </div>
  )
}
