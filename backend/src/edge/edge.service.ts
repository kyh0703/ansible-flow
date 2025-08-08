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
    return await this.prisma.$transaction(async (tx) => {
      const data = createEdgeDtos.map((dto) => ({ ...dto, flowId }))

      // 일괄 생성
      await tx.edge.createMany({ data })

      // 생성된 에지들을 조회하여 반환
      return await tx.edge.findMany({
        where: { flowId, flow: { projectId } },
        orderBy: { createdAt: 'desc' },
      })
    })
  }

  async updateMany(
    projectId: string,
    flowId: string,
    updateEdgeDtos: UpdateEdgeDto[],
  ): Promise<Edge[]> {
    return await this.prisma.$transaction(async (tx) => {
      const results: Edge[] = []

      for (const dto of updateEdgeDtos) {
        if (!dto.id) throw new NotFoundException('id is required for update')

        // flowId, projectId 일치 검증
        const edge = await tx.edge.findFirst({
          where: { id: dto.id, flowId, flow: { projectId } },
        })
        if (!edge) throw new NotFoundException('Edge not found')

        const updated = await tx.edge.update({
          where: { id: dto.id },
          data: dto,
        })
        results.push(updated)
      }

      return results
    })
  }

  async deleteMany(
    projectId: string,
    flowId: string,
    ids: string[],
  ): Promise<string[]> {
    return await this.prisma.$transaction(async (tx) => {
      // 소유권 검증 - 트랜잭션 내에서 수행
      for (const id of ids) {
        const edge = await tx.edge.findFirst({
          where: { id, flowId, flow: { projectId } },
        })
        if (!edge) throw new NotFoundException(`Edge with id ${id} not found`)
      }

      // 검증 완료 후 일괄 삭제
      await tx.edge.deleteMany({
        where: { id: { in: ids }, flowId },
      })

      return ids
    })
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
