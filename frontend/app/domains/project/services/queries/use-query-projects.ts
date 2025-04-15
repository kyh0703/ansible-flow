import { getProjects } from '../api'
import { projectKey } from '../keys'

export const useQueryProjects = () => ({
  queryKey: [projectKey.list],
  queryFn: () => getProjects(),
})
