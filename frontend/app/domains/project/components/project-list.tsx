import { useSuspenseQuery } from '@tanstack/react-query'
import { useQueryProjects } from '@/domains/project/services'
import { Button } from '@/shared/ui/button'
import ProjectCard from './project-card'
import ProjectTitle from './project-title'
import { Separator } from '@/shared/ui/separator'

export default function ProjectList() {
  const { data: projects } = useSuspenseQuery(useQueryProjects())

  return (
    <div className="flex w-full flex-col gap-4">
      <ProjectTitle />
      <Separator />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
