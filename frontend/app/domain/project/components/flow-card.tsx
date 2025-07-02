import type { Flow } from '@/shared/models/flow'
import { Button } from '@/shared/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

type FlowCardProps = {
  flow: Flow
}

export default function FlowCard({ flow }: Readonly<FlowCardProps>) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="from-primary/15 to-primary/5 relative flex aspect-video w-full items-center justify-center bg-gradient-to-br p-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
          <div className="text-2xl">⚡</div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <CardHeader className="flex flex-col space-y-2 p-6">
        <CardTitle className="group-hover:text-primary line-clamp-1 text-xl font-semibold transition-colors">
          {flow.name}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-sm leading-relaxed">
          {flow.description || '플로우 설명이 없습니다'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-6 pt-0">
        <div className="text-muted-foreground flex items-center justify-between text-xs">
          <span>최근 수정</span>
          <span>
            {flow.updateAt
              ? new Date(flow.updateAt).toLocaleDateString('ko-KR')
              : '-'}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button
          asChild
          className="group-hover:bg-primary/90 w-full transition-colors"
        >
          <Link to={`/projects/${flow.projectId}/flows/${flow.id}`}>
            Flow 열기{' '}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
