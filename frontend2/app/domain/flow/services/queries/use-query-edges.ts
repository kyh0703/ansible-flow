import { getEdges } from '../api'
import { flowKey } from '../keys'

export const useQueryEdges = (projectId: number, flowId: number) => ({
  queryKey: [flowKey.edges],
  queryFn: () => getEdges(flowId),
})
