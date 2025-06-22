import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Project } from 'generated/client'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'

@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name)

  constructor(private readonly prisma: PrismaService) {}

  async pagination(params: { userId: string; skip: number; take: number }) {
    const { userId, skip, take } = params
    this.logger.log(`userId: ${userId}, skip: ${skip}, take: ${take}`)
    const [items, total] = await this.prisma.$transaction([
      this.prisma.project.findMany({
        where: { userId },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.project.count({ where: { userId } }),
    ])
    this.logger.log(`Found ${items.length} items, total: ${total}`)
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

  async isUserMemberOfProject(
    userId: string,
    projectId: string,
  ): Promise<boolean> {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    })
    if (!project) return false
    return project.userId === userId
  }
}
