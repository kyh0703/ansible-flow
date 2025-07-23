import type { Project } from '@/shared/models/project'
import type { PaginationResponse } from '@/shared/types/pagination'
import { getProjects } from '../api'
import { projectKey } from '../keys'

export const useInfiniteQueryProjects = () => ({
  queryKey: [projectKey.all],
  queryFn: ({ pageParam = 1 }) => getProjects(pageParam, 10),
  initialPageParam: 1,
  getNextPageParam: (lastPage: PaginationResponse<Project>) => {
    if (!lastPage.meta.hasNext) return undefined
    return lastPage.meta.page + 1
  },
})
