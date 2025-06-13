import { getProjectFlow } from '../api'
import { projectKey } from '../keys'

export const useQueryProjectFlow = (projectId: number, flowId: number) => ({
  queryKey: [projectKey.flows.detail(projectId, flowId)],
  queryFn: () => getProjectFlow(projectId, flowId),
})
