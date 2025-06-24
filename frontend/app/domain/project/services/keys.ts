export const projectKey = {
  all: ['projects'] as const,
  flows: (projectId: string) =>
    [...projectKey.all, projectId, 'flows'] as const,
}
