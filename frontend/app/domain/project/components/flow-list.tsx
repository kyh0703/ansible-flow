import { Spinner } from '@/shared/ui/spinner'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQueryFlows } from '../services'
import FlowCard from './flow-card'

interface FlowListProps {
  projectId: number
}

export default function FlowList({ projectId }: FlowListProps) {
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  })
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(useInfiniteQueryFlows(projectId))

  const flows = data?.pages.flatMap((page) => page.data) || []

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage()
    }
  }, [inView])

  if (status === 'pending') {
    return (
      <div className="flex h-40 items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="text-destructive flex h-40 items-center justify-center">
        플로우 불러오기 실패: {error.message}
      </div>
    )
  }

  return (
    <div
      className="h-[calc(100vh-6rem)] w-full overflow-auto"
      id="scrollableDiv"
    >
      {flows.length === 0 ? (
        <div className="text-muted-foreground flex h-40 items-center justify-center">
          플로우가 없습니다
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 p-4">
          {flows.map((flow) => (
            <FlowCard key={flow.id} flow={flow} />
          ))}
        </div>
      )}
      {isFetchingNextPage ? (
        <div className="fixed right-4 bottom-4">
          <Spinner size="lg" />
        </div>
      ) : (
        <div ref={ref} style={{ height: 50 }} />
      )}
    </div>
  )
}
