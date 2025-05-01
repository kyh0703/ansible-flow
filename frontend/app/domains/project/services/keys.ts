export const projectKey = {
  all: ['projects'] as const,
  lists: () => [...projectKey.all] as const,
  detail: (id: number) => [...projectKey.all, id] as const,
  flows: {
    all: (projectId: number) =>
      [...projectKey.all, projectId, 'flows'] as const,
    lists: (projectId: number) => [...projectKey.flows.all(projectId)] as const,
    detail: (projectId: number, flowId: number) =>
      [...projectKey.flows.all(projectId), flowId] as const,
  },
}
