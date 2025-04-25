import { Suspense } from 'react'
import { Spinner } from '@/shared/ui/spinner'
import ProjectList from '../components/project-list'
import ProjectDashboard from '../components/project-dashboard'

export default function Page() {
  return (
    <div className="flex h-full w-full">
      <Suspense fallback={<Spinner />}>
        <ProjectDashboard />
      </Suspense>
    </div>
  )
}
