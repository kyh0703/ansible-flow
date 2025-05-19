import { getProject } from '../api'
import { projectKey } from '../keys'

export const useQueryProject = (id: number) => ({
  queryKey: [projectKey.detail(id)],
  queryFn: () => getProject(id),
})
