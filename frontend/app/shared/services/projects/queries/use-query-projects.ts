import { getProjects } from '../api'
import { projectKey } from '../keys'

export const useQueryProjects = (id: number) => ({
  queryKey: [projectKey.list],
  queryFn: () => getProjects(),
})
