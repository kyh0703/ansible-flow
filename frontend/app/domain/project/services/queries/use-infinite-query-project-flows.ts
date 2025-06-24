import type { Flow } from '@/shared/models/flow'
import type { PaginationResponse } from '@/shared/types/pagination'
import { getProjectFlows } from '../api'
import { projectKey } from '../keys'

export const useInfiniteQueryFlows = (projectId: string) => ({
  queryKey: [projectKey.flows(projectId)],
  queryFn: ({ pageParam = 1 }) => getProjectFlows(projectId, pageParam, 10),
  initialPageParam: 1,
  getNextPageParam: (lastPage: PaginationResponse<Flow>) => {
    if (!lastPage.meta.hasNext) return undefined
    return lastPage.meta.page + 1
  },
})
