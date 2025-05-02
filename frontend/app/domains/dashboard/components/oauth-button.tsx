import { GithubIcon, GoogleIcon, KakaoIcon } from '@/shared/components/icon'
import { Button } from '@/shared/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip'

export default function OAuthButton() {
  const redirectURL = encodeURIComponent(
    `${window.location.origin}/auth/callback`,
  )

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google/login?redirect_url=${redirectURL}`
  }

  const handleKakaoLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/kakao/login?redirect_url=${redirectURL}`
  }

  const handleGithubLogin = () =>{
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/github/login?redirect_url=${redirectURL}`
  }

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="size-10 rounded-full"
            variant="ghost"
            type="button"
            onClick={handleGoogleLogin}
          >
            <GoogleIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">구글로 로그인하기</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="size-10 rounded-full"
            variant="ghost"
            size="icon"
            type="button"
            onClick={handleGithubLogin}
          >
            <GithubIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">깃허브로 로그인하기</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="size-10 rounded-full"
            variant="ghost"
            size="icon"
            type="button"
            onClick={handleKakaoLogin}
          >
            <KakaoIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">카카오로 로그인하기</p>
        </TooltipContent>
      </Tooltip>
    </>
  )
}
