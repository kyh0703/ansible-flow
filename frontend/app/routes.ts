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
      route('/callback', './domain/auth/pages/auth-callback.tsx'),
      route('/forgot-password', './domain/auth/pages/forgot-password.tsx'),
      route('/reset-password', './domain/auth/pages/reset-password.tsx'),
    ]),
    layout('./domain/project/layouts/index.tsx', [
      ...prefix('projects', [
        index('./domain/project/pages/index.tsx'),
        route(':projectId/:projectName', './domain/project/pages/flows.tsx'),
      ]),
    ]),
    layout('./domain/flow/layouts/index.tsx', [
      ...prefix('design', [
        route(':projectId/:flowId', './domain/flow/pages/index.tsx'),
      ]),
    ]),
  ]),
] satisfies RouteConfig
