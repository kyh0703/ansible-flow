import { Spinner } from '@/shared/ui/spinner'
import { Suspense } from 'react'
import ProjectDashboard from '../components/project-dashboard'
import ProjectHeader from '../components/project-header'
import { useUser } from '@/shared/store/user'
import { useNavigate } from 'react-router'

export default function Page() {
  const navigate = useNavigate()
  const user = useUser()

  if (!user) {
    navigate('/auth/login')
    return null
  }

  return (
    <div className="flex h-full w-full flex-col">
      <ProjectHeader />
      <div className="flex-1">
        <Suspense fallback={<Spinner />}>
          <ProjectDashboard />
        </Suspense>
      </div>
    </div>
  )
}
