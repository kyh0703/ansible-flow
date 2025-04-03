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
    layout('./domains/project/layouts/index.tsx', [
      ...prefix('project', [
        index('./domains/project/pages/index.tsx'),
        route(':projectId', './domains/project/pages/detail.tsx'),
      ]),
    ]),
    layout('./domains/flow/layouts/index.tsx', [
      ...prefix('flow', [route(':flowId', './domains/flow/pages/detail.tsx')]),
    ]),
  ]),
] satisfies RouteConfig
