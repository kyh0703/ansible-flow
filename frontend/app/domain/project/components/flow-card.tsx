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

interface FlowCardProps {
  flow: Flow
}

export default function FlowCard({ flow }: Readonly<FlowCardProps>) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-md">
      <div className="from-primary/20 to-primary/5 flex aspect-video w-full items-center justify-center bg-gradient-to-br p-8">
        {/* TODO COMPONENT */}
      </div>
      <CardHeader className="flex flex-col space-y-1.5 p-6">
        <CardTitle className="text-xl">{flow.name}</CardTitle>
        <CardDescription>{flow.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-6 pt-0">
        <div className="flex flex-wrap gap-2">
          {/* {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
            >
              {tag}
            </span>
          ))} */}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full">
          <Link to={`/projects/${flow.projectId}/flows/${flow.id}`}>
            View Flow <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
