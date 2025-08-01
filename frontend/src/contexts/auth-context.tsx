import { Spinner } from '@/components/ui/spinner'
import logger from '@/lib/logger'
import type { User } from '@/models'
import { me } from '@/services/auth/api'
import { setToken } from '@/services/token'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

interface AuthContextType {
  authUser: User | null
  isLoggedIn: boolean
  checkAuth: () => Promise<void>
  clearAuth: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: Readonly<PropsWithChildren>) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authUser, setAuthUser] = useState<User | null>(null)

  const checkAuth = useCallback(async () => {
    try {
      const userData = await me()
      setAuthUser(userData)
      setIsLoggedIn(true)
      logger.info('User login successfully')
    } catch (error) {
      logger.error('User login failed', error)
      clearAuth()
    } finally {
      setIsLoggedIn(false)
    }
  }, [setAuthUser])

  const clearAuth = useCallback(() => {
    setAuthUser(null)
    setToken(null)
    setIsLoggedIn(false)
  }, [setAuthUser])

  useEffect(() => {
    checkAuth()
  }, [])

  const value: AuthContextType = useMemo(
    () => ({
      authUser,
      setAuthUser,
      isLoggedIn,
      setIsLoggedIn,
      checkAuth,
      clearAuth,
    }),
    [],
  )

  // Show loading spinner while checking authentication
  if (isLoggedIn) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
