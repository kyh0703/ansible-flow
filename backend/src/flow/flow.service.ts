import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Flow } from 'generated/client'
import { CreateFlowDto } from './dto/create-flow.dto'
import { UpdateFlowDto } from './dto/update-flow.dto'

@Injectable()
export class FlowService {
  constructor(private readonly prisma: PrismaService) {}

  // 플로우 목록(페이징)
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

  async findOne(projectId: string, id: string): Promise<Flow> {
    const flow = await this.prisma.flow.findFirst({ where: { id, projectId } })
    if (!flow) throw new NotFoundException('Flow not found')
    return flow
  }

  async create(projectId: string, createFlowDto: CreateFlowDto): Promise<Flow> {
    return this.prisma.flow.create({ data: { ...createFlowDto, projectId } })
  }

  async update(
    projectId: string,
    id: string,
    updateFlowDto: UpdateFlowDto,
  ): Promise<Flow> {
    const flow = await this.findOne(projectId, id)
    return this.prisma.flow.update({ where: { id }, data: updateFlowDto })
  }

  async delete(projectId: string, id: string): Promise<Flow> {
    // projectId 일치하는지 검증
    const flow = await this.findOne(projectId, id)
    return this.prisma.flow.delete({ where: { id } })
  }

  // 플로우 구조 조회 (예시)
  async findStructure(projectId: string, id: string) {
    // 실제 구조 반환 로직은 도메인에 맞게 구현 필요
    const flow = await this.findOne(projectId, id)
    // 예시: 노드/에지 포함 구조 반환
    return this.prisma.flow.findFirst({
      where: { id, projectId },
      include: { nodes: true, edges: true },
    })
  }
}
