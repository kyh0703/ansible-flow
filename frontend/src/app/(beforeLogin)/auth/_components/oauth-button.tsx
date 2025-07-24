'use client'

import { GithubIcon, GoogleIcon, KakaoIcon } from '@/components/icon'
import { Button } from '@/components/ui/button'

export default function OAuthButton() {
  const redirectURL = encodeURIComponent(
    `${window.location.origin}/auth/callback`,
  )

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google?redirect=${redirectURL}`
  }

  const handleKakaoLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/kakao?redirect=${redirectURL}`
  }

  const handleGithubLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/github?redirect=${redirectURL}`
  }

  return (
    <div className="space-y-3">
      <Button
        className="h-12 w-full text-base font-medium"
        variant="outline"
        type="button"
        onClick={handleGoogleLogin}
      >
        <GoogleIcon className="mr-3 size-4 flex-shrink-0" />
        구글로 로그인하기
      </Button>
      <Button
        className="h-12 w-full text-base font-medium"
        variant="outline"
        type="button"
        onClick={handleGithubLogin}
      >
        <GithubIcon className="mr-3 size-6 flex-shrink-0" />
        깃허브로 로그인하기
      </Button>
      <Button
        className="h-12 w-full text-base font-medium"
        variant="outline"
        type="button"
        onClick={handleKakaoLogin}
      >
        <KakaoIcon className="mr-3 size-4 flex-shrink-0" />
        카카오로 로그인하기
      </Button>
    </div>
  )
}
