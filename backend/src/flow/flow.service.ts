import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Flow } from 'generated/client'
import { CreateFlowDto } from './dto/create-flow.dto'
import { UpdateFlowDto } from './dto/update-flow.dto'

@Injectable()
export class FlowService {
  private readonly logger = new Logger(FlowService.name)

  constructor(private readonly prisma: PrismaService) {}

  async findAll(params: {
    projectId: string
    skip: number
    take: number
  }): Promise<{ items: Flow[]; total: number }> {
    const { projectId, skip, take } = params
    const [items, total] = await this.prisma.$transaction([
      this.prisma.flow.findMany({
        where: { projectId },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.flow.count({
        where: { projectId },
      }),
    ])
    return { items, total }
  }

  async findOne(id: string): Promise<Flow> {
    const flow = await this.prisma.flow.findFirst({ where: { id } })
    if (!flow) throw new NotFoundException('Flow not found')
    return flow
  }

  async create(projectId: string, createFlowDto: CreateFlowDto): Promise<Flow> {
    this.logger.log(`Creating flow for project ${projectId}`)
    return this.prisma.flow.create({ data: { ...createFlowDto, projectId } })
  }

  async update(id: string, updateFlowDto: UpdateFlowDto): Promise<Flow> {
    return this.prisma.flow.update({ where: { id }, data: updateFlowDto })
  }

  async delete(id: string): Promise<Flow> {
    return this.prisma.flow.delete({ where: { id } })
  }

  async findStructure(id: string) {
    const flow = await this.prisma.flow.findFirst({
      where: { id },
      include: { nodes: true, edges: true },
    })
    return {
      nodes: flow?.nodes ?? [],
      edges: flow?.edges ?? [],
    }
  }
}
