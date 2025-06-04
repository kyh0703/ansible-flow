import { Injectable, NotFoundException } from '@nestjs/common'
import { Edge } from 'generated/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateEdgeDto } from './dto/create-edge.dto'
import { UpdateEdgeDto } from './dto/update-edge.dto'

@Injectable()
export class EdgeService {
  constructor(private readonly prisma: PrismaService) {}

  async createMany(
    projectId: string,
    flowId: string,
    createEdgeDtos: CreateEdgeDto[],
  ): Promise<Edge[]> {
    const data = createEdgeDtos.map((dto) => ({ ...dto, flowId }))
    await this.prisma.edge.createMany({ data })
    return this.findMany(projectId, flowId)
  }

  async updateMany(
    projectId: string,
    flowId: string,
    updateEdgeDtos: UpdateEdgeDto[],
  ): Promise<Edge[]> {
    const results: Edge[] = []
    for (const dto of updateEdgeDtos) {
      if (!dto.id) throw new NotFoundException('id is required for update')
      const edge = await this.findOne(projectId, flowId, dto.id)
      const updated = await this.prisma.edge.update({
        where: { id: dto.id },
        data: dto,
      })
      results.push(updated)
    }
    return results
  }

  async deleteMany(
    projectId: string,
    flowId: string,
    ids: string[],
  ): Promise<string[]> {
    // 소유권 검증
    for (const id of ids) {
      await this.findOne(projectId, flowId, id)
    }
    await this.prisma.edge.deleteMany({ where: { id: { in: ids }, flowId } })
    return ids
  }

  async findOne(projectId: string, flowId: string, id: string): Promise<Edge> {
    const edge = await this.prisma.edge.findFirst({
      where: { id, flowId, flow: { projectId } },
    })
    if (!edge) throw new NotFoundException('Edge not found')
    return edge
  }

  async findMany(projectId: string, flowId: string): Promise<Edge[]> {
    return this.prisma.edge.findMany({
      where: { flowId, flow: { projectId } },
      orderBy: { createdAt: 'desc' },
    })
  }
}
