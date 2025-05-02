import { setToken } from '@/shared/services'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function AuthCallback() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const token = params.get('token')
    const expiresIn = params.get('expires_in')

    if (token) {
      const expiryTimestamp = Math.floor(
        (Date.now() + Number(expiresIn) * 1000) / 1000,
      )
      setToken({
        accessToken: token,
        accessExpiresIn: expiryTimestamp,
      })
      navigate('/projects')
    } else {
      navigate('/dashboard', { state: { error: '인증에 실패했습니다.' } })
    }
  }, [])

  return <div>인증 처리 중...</div>
}
