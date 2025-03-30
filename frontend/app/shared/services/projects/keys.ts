export const projectKey = {
  project: ['project'] as const,
  list: ['projects'] as const,
  detail: (projectId: number) => [projectKey.project, projectId] as const,
}
