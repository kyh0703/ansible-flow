import { useInfiniteQueryProjects } from '@/domains/project/services'
import { Spinner } from '@/shared/ui/spinner'
import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import ProjectCard from './project-card'

export default function ProjectList() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(useInfiniteQueryProjects())

  const projects = data?.pages.flatMap((page) => page.items) || []

  const loadMore = () => {
    if (!isFetchingNextPage) {
      fetchNextPage()
    }
  }

  if (status === 'pending') {
    return <div>게시물을 불러오는 중...</div>
  }

  if (status === 'error') {
    return <div>게시물 불러오기 실패: {error.message}</div>
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {projects.length === 0 ? (
        <div>프로젝트가 없습니다</div>
      ) : (
        <InfiniteScroll
          className="overflow-hidden"
          dataLength={projects.length}
          next={loadMore}
          hasMore={hasNextPage}
          loader={<Spinner size="lg" />}
          scrollThreshold={0.9}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </InfiniteScroll>
      )}
      {/* 백그라운드 로딩 표시 */}
      {isFetching && !isFetchingNextPage && (
        <div className="background-loading">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  )
}
