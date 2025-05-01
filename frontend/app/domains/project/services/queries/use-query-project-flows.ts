import type { Project } from '@/shared/models/project'
import { getProjectFlows } from '../api'
import { projectKey } from '../keys'

export const useInfiniteQueryFlows = (projectId: number) => ({
  queryKey: [projectKey.flows.lists(projectId)],
  queryFn: ({ pageParam = 0 }) => getProjectFlows(projectId, pageParam, 10),
  initialPageParam: 0,
  getNextPageParam: (lastPage: {
    items: Project[]
    meta: {
      total: number
      skip: number
      take: number
      hasMore: boolean
      page: number
      totalPages: number
    }
  }) => {
    if (!lastPage.meta.hasMore) return undefined
    return lastPage.meta.page + 1
  },
})
