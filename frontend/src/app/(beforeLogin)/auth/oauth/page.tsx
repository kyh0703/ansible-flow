'use client'

import { Spinner } from '@/components/ui/spinner'
import { setToken } from '@/services'
import { me } from '@/services/auth'
import { useUserActions } from '@/stores/user-store'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

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
      setToken({ accessToken: token })
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
