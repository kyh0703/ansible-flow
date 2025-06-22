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
    route('/subscription', './domain/subscription/pages/index.tsx'),
    ...prefix('auth', [
      route('/login', './domain/auth/pages/login.tsx'),
      route('/register', './domain/auth/pages/register.tsx'),
      route('/forgot-password', './domain/auth/pages/forgot-password.tsx'),
      route('/callback', './domain/auth/pages/auth-callback.tsx'),
    ]),
    layout('./domain/project/layouts/index.tsx', [
      ...prefix('projects', [
        index('./domain/project/pages/index.tsx'),
        route(':projectId', './domain/project/pages/detail.tsx'),
        route(':projectId/flows', './domain/project/pages/flows.tsx'),
        route(':projectId/flows/:flowId', './domain/flow/pages/detail.tsx'),
      ]),
    ]),
  ]),
] satisfies RouteConfig
