import { getStructure } from '../api'
import { flowKey } from '../keys'

export const useQueryStructure = (projectId: number, flowId: number) => ({
  queryKey: [flowKey.structure],
  queryFn: () => getStructure(projectId, flowId),
})
