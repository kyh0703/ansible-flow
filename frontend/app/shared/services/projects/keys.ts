export const projectKey = {
  project: ['project'] as const,
  list: ['projects'] as const,
  detail: (id: number) => [projectKey.project, id] as const,
}
