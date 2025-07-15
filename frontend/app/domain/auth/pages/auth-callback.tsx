import { setToken } from '@/shared/services'
import { useUserActions } from '@/shared/store/user'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { me } from '../services'
import { Spinner } from '@/shared/ui/spinner'

export default function AuthCallback() {
  const navigate = useNavigate()
  const location = useLocation()
  const { setUser } = useUserActions()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const token = params.get('token')

    const setUserInfo = async () => {
      const user = await me()
      setUser(user)
    }

    if (token) {
      setToken({ accessToken: token })
      setUserInfo()
      navigate('/projects')
    } else {
      navigate('/', {
        state: { error: '인증에 실패했습니다.' },
        replace: true,
      })
    }
  }, [])

  return (
    <div className="flex h-screen items-center justify-center">
      <Spinner />
    </div>
  )
}
