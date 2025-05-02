import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes'

export default [
  layout('./shared/providers/index.tsx', [
    index('./domains/dashboard/pages/home.tsx'),
    route('/auth/callback', './domains/dashboard/pages/auth-callback.tsx'),
    layout('./domains/project/layouts/index.tsx', [
      ...prefix('projects', [
        index('./domains/project/pages/index.tsx'),
        route(':projectId', './domains/project/pages/detail.tsx'),
        route(':projectId/flows/:flowId', './domains/flow/pages/index.tsx'),
      ]),
    ]),
  ]),
] satisfies RouteConfig
