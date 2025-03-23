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
    // ...prefix('auth', [
    //   layout('./domains/auth/layout.tsx', [
    //     route('login', './domains/auth/pages/login.tsx'),
    //     route('register', './domains/auth/pages/register.tsx'),
    //   ]),
    // ]),
    layout('./shared/layouts/main.tsx', [
      ...prefix('flow', [route(':flowId', './domains/flow/pages/detail.tsx')]),
    ]),
  ]),
] satisfies RouteConfig
