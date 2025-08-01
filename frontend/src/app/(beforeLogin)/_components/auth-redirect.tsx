'use client'

import { useAuth } from '@/contexts'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function AuthRedirect() {
  const router = useRouter()
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/projects')
    }
  }, [isLoggedIn])

  return null
}
