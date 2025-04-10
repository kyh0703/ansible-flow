import { Suspense } from 'react'
import { Spinner } from '~/shared/ui/spinner'
import ProjectList from '../components/project-list'

export default function Page() {
  return (
    <div className="flex h-full w-full p-6">
      <h1>test</h1>
      <Suspense fallback={<Spinner />}>
        <ProjectList />
      </Suspense>
    </div>
  )
}
