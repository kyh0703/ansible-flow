import { type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router'
import { useIsAuthenticated } from '@/shared/store/user'

type ProtectedRouteProps = {
  readonly children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useIsAuthenticated()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
