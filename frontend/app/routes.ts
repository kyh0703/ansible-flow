import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes'

export default [
  layout('./shared/providers/index.tsx', [
    index('./domain/dashboard/pages/home.tsx'),
    route('/auth/callback', './domain/dashboard/pages/auth-callback.tsx'),
    layout('./domain/projects/layouts/index.tsx', [
      ...prefix('projects', [
        index('./domain/projects/pages/index.tsx'),
        route(':projectId', './domain/projects/pages/detail.tsx'),
        route(':projectId/flows', './domain/projects/pages/flows.tsx'),
        route(':projectId/flows/:flowId', './domain/flows/pages/detail.tsx'),
      ]),
    ]),
  ]),
] satisfies RouteConfig
