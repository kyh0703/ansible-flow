import { getNodes } from '../api'
import { flowKey } from '../keys'

export const useQueryNodes = (projectId: number, flowId: number) => ({
  queryKey: [flowKey.nodes],
  queryFn: () => getNodes(flowId),
})
