import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react'
import { useUserActions, useIsInitialized } from '@/shared/store/user'
import { me } from '../services/api/me'

type AuthContextType = {
  isInitialized: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderProps = {
  readonly children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, setInitialized, logout } = useUserActions()
  const isInitialized = useIsInitialized()

  const contextValue = useMemo(() => ({ isInitialized }), [isInitialized])

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const userData = await me()
        setUser(userData)
      } catch {
        logout()
      } finally {
        setInitialized(true)
      }
    }

    if (!isInitialized) {
      initializeAuth()
    }
  }, [setUser, setInitialized, logout, isInitialized])

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
          <span className="text-sm text-gray-600">초기화 중...</span>
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
