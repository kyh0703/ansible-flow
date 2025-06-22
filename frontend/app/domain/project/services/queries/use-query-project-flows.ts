import type { Flow } from '@/shared/models/flow'
import type { PaginationResponse } from '@/shared/types/pagination'
import { getProjectFlows } from '../api'
import { projectKey } from '../keys'

export const useInfiniteQueryFlows = (projectId: number) => ({
  queryKey: [projectKey.flows.lists(projectId)],
  queryFn: ({ pageParam = 0 }) => getProjectFlows(projectId, pageParam, 10),
  initialPageParam: 0,
  getNextPageParam: (lastPage: PaginationResponse<Flow>) => {
    if (!lastPage.meta.hasNext) return undefined
    return lastPage.meta.page + 1
  },
})
