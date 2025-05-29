import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Project } from 'generated/client'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async pagination(params: { userId: string; skip: number; take: number }) {
    const { userId, skip, take } = params
    const [items, total] = await this.prisma.$transaction([
      this.prisma.project.findMany({
        where: { userId },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.project.count({ where: { userId } }),
    ])
    return { items, total }
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.prisma.project.findUnique({ where: { id } })
    if (!project) throw new NotFoundException('Project not found')
    return project
  }

  async create(data: CreateProjectDto & { userId: string }) {
    return this.prisma.project.create({ data })
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return this.prisma.project.update({ where: { id }, data: updateProjectDto })
  }

  async delete(id: string): Promise<Project> {
    return this.prisma.project.delete({ where: { id } })
  }
}
