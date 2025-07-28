import { Spinner } from '@/components/ui/spinner'
import logger from '@/lib/logger'
import { setToken } from '@/services/token'
import { me } from '@/services/auth/api'
import { useUserActions } from '@/stores/user-store'
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
  isAuthLoading: boolean
  checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: Readonly<PropsWithChildren>) {
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  const { setUser } = useUserActions()

  const checkAuth = useCallback(async () => {
    try {
      // Try to get user info from server using httpOnly cookie
      const userData = await me()
      setUser(userData)
      logger.info('User authenticated successfully')
    } catch (error) {
      logger.error('User not authenticated', error)
      setUser(null)
      setToken(null)
    } finally {
      setIsAuthLoading(false)
    }
  }, [setUser])

  useEffect(() => {
    checkAuth()
  }, [])

  const value: AuthContextType = useMemo(
    () => ({
      isAuthLoading,
      checkAuth,
    }),
    [isAuthLoading, checkAuth],
  )

  // Show loading spinner while checking authentication
  if (isAuthLoading) {
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
