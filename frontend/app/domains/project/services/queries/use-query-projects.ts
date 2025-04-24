import type { Project } from '@/shared/models/project'
import { getProjects } from '../api'
import { projectKey } from '../keys'

export const useInfiniteQueryProjects = () => ({
  queryKey: [projectKey.list],
  queryFn: ({ pageParam = 0, take = 10 }) => getProjects(pageParam, take),
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
    return lastPage.meta.hasMore ? lastPage.meta.skip + 10 : undefined
  },
  initialPageParam: 0,
})
