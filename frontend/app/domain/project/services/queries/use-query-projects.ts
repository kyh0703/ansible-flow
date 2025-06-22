import type { Flow } from '@/shared/models/flow'
import type { PaginationResponse } from '@/shared/types/pagination'
import { getProjects } from '../api'
import { projectKey } from '../keys'

export const useInfiniteQueryProjects = () => ({
  queryKey: [projectKey.lists],
  queryFn: ({ pageParam = 1 }) => getProjects(pageParam, 10),
  initialPageParam: 1,
  getNextPageParam: (lastPage: PaginationResponse<Flow>) => {
    if (!lastPage.meta.hasNext) return undefined
    return lastPage.meta.page + 1
  },
})
