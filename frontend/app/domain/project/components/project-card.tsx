import type { Project } from '@/shared/models/project'
import { Button } from '@/shared/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { MoreHorizontal, Star, Users, FolderOpen, Calendar } from 'lucide-react'
import { Link } from 'react-router'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { Badge } from '@/shared/ui/badge'

const getProjectColor = (id: string) => {
  const colors = [
    'from-blue-500/10 to-blue-600/5 border-blue-200/20',
    'from-purple-500/10 to-purple-600/5 border-purple-200/20',
    'from-green-500/10 to-green-600/5 border-green-200/20',
    'from-orange-500/10 to-orange-600/5 border-orange-200/20',
    'from-pink-500/10 to-pink-600/5 border-pink-200/20',
    'from-indigo-500/10 to-indigo-600/5 border-indigo-200/20',
  ]
  return colors[parseInt(id.toString(), 36) % colors.length]
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: Readonly<ProjectCardProps>) {
  const colorClass = getProjectColor(project.id)

  return (
    <Card className="group border-border/50 bg-card/50 hover:border-border relative flex h-full flex-col overflow-hidden border backdrop-blur-sm transition-all duration-200 hover:shadow-lg hover:shadow-black/5">
      <div className="from-primary/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      <CardHeader className="relative space-y-0 p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`h-10 w-10 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center border`}
            >
              <FolderOpen className="text-muted-foreground h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="truncate text-base leading-none font-semibold">
                {project.name}
              </CardTitle>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="secondary" className="h-5 px-2 py-0.5 text-xs">
                  Active
                </Badge>
                <div className="text-muted-foreground flex items-center text-xs">
                  <Calendar className="mr-1 h-3 w-3" />2 days ago
                </div>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Star className="mr-2 h-4 w-4" />
                Add to favorites
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                Share project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-4 pt-0">
        <div className="text-muted-foreground flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>3 flows</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>2 members</span>
            </div>
          </div>

          <div className="flex -space-x-2">
            <div className="border-background flex h-6 w-6 items-center justify-center rounded-full border-2 bg-gradient-to-br from-blue-500 to-blue-600">
              <span className="text-[10px] font-medium text-white">A</span>
            </div>
            <div className="border-background flex h-6 w-6 items-center justify-center rounded-full border-2 bg-gradient-to-br from-green-500 to-green-600">
              <span className="text-[10px] font-medium text-white">B</span>
            </div>
          </div>
        </div>
      </CardContent>

      <Link
        to={`/projects/${project.id}`}
        className="absolute inset-0 z-10"
        aria-label={`Open ${project.name} project`}
      />
    </Card>
  )
}
