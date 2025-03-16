import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes'

export default [
  ...prefix('auth', [
    layout('./domains/auth/layout.tsx', [
      route('login', './domains/auth/page/login.tsx'),
      route('register', './domains/auth/page/register.tsx'),
    ]),
  ]),

  //   ...prefix('flow', [
  //     layout('layouts/main.tsx', [index('/domains/flow/page.tsx')]),
  //   ]),
] satisfies RouteConfig
