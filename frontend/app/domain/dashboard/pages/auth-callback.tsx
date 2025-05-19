import { setToken } from '@/shared/services'
import { useUserActions } from '@/shared/store/user'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { me } from '../services'

export default function AuthCallback() {
  const navigate = useNavigate()
  const location = useLocation()
  const { setUser } = useUserActions()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const token = params.get('token')
    const expiresIn = params.get('expires_in')

    const setUserInfo = async () => {
      const user = await me()
      setUser(user)
    }

    if (token) {
      const expiryTimestamp = Math.floor(
        (Date.now() + Number(expiresIn) * 1000) / 1000,
      )
      setToken({
        accessToken: token,
        accessExpiresIn: expiryTimestamp,
      })
      setUserInfo()
      navigate('/projects')
    } else {
      navigate('/dashboard', { state: { error: '인증에 실패했습니다.' } })
    }
  }, [])

  return <div>인증 처리 중...</div>
}
