import { Spinner } from '@/shared/ui/spinner'
import { Suspense } from 'react'
import ProjectDashboard from '../components/project-dashboard'
import ProjectHeader from '../components/project-header'

export function Index() {
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
