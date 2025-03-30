import type { Route } from './+types'

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { flowId } = params
  return { flowId }
}

export default function Detail() {
  return (
    <div>
      <h1>Project Detail Page</h1>
      <p>Here you can view and manage the details of your project.</p>
    </div>
  )
}
