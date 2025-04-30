import type { Route } from '../../+types/root'

export default function Page({ params }: Readonly<Route.ComponentProps>) {
  return (
    <div>
      <h1>Flow</h1>
    </div>
  )
}
