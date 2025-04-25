import type { Project } from '@/shared/models/project'
import { getProjects } from '../api'
import { projectKey } from '../keys'

export const useInfiniteQueryProjects = () => ({
  queryKey: [projectKey.list],
  queryFn: ({ pageParam = 0 }) => getProjects(pageParam, 10),
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
