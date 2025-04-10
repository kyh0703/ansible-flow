import { useState } from 'react'
import { type Project } from '~/shared/models/project'
import { Button } from '~/shared/ui/button'
import ProjectCard from './project-card'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { useQueryProjects } from '~/shared/services/\bprojects'

export default function ProjectList() {
  const { data: projects } = useSuspenseQuery(useQueryProjects())

  return (
    <div>
      <div className="flex items-center justify-between">
        <Button>새프로젝트</Button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
