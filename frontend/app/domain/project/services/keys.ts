export const projectKey = {
  all: ['projects'] as const,
  lists: () => [...projectKey.all] as const,
  detail: (id: string) => [...projectKey.all, id] as const,
  flows: {
    all: (projectId: string) =>
      [...projectKey.all, projectId, 'flows'] as const,
    lists: (projectId: string) => [...projectKey.flows.all(projectId)] as const,
    detail: (projectId: string, flowId: string) =>
      [...projectKey.flows.all(projectId), flowId] as const,
  },
}
