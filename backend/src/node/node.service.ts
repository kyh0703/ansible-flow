import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Node } from 'generated/client'
import { CreateNodeDto } from './dto/create-node.dto'
import { UpdateNodeDto } from './dto/update-node.dto'

@Injectable()
export class NodeService {
  constructor(private readonly prisma: PrismaService) {}

  async createMany(
    projectId: string,
    flowId: string,
    createNodeDtos: CreateNodeDto[],
  ): Promise<Node[]> {
    return await this.prisma.$transaction(async (tx) => {
      const data = createNodeDtos.map((dto) => ({ ...dto, flowId }))

      // 일괄 생성
      await tx.node.createMany({ data })

      // 생성된 노드들을 조회하여 반환
      return await tx.node.findMany({
        where: { flowId, flow: { projectId } },
        orderBy: { createdAt: 'desc' },
      })
    })
  }

  async updateMany(
    projectId: string,
    flowId: string,
    updateNodeDtos: UpdateNodeDto[],
  ): Promise<Node[]> {
    return await this.prisma.$transaction(async (tx) => {
      const results: Node[] = []

      for (const dto of updateNodeDtos) {
        if (!dto.id) throw new NotFoundException('id is required for update')

        // flowId, projectId 일치 검증
        const node = await tx.node.findFirst({
          where: { id: dto.id, flowId, flow: { projectId } },
        })
        if (!node) throw new NotFoundException('Node not found')

        const updated = await tx.node.update({
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
        const node = await tx.node.findFirst({
          where: { id, flowId, flow: { projectId } },
        })
        if (!node) throw new NotFoundException(`Node with id ${id} not found`)
      }

      // 검증 완료 후 일괄 삭제
      await tx.node.deleteMany({
        where: { id: { in: ids }, flowId },
      })

      return ids
    })
  }

  async findOne(projectId: string, flowId: string, id: string): Promise<Node> {
    const node = await this.prisma.node.findFirst({
      where: { id, flowId, flow: { projectId } },
    })
    if (!node) throw new NotFoundException('Node not found')
    return node
  }

  async findMany(projectId: string, flowId: string): Promise<Node[]> {
    return this.prisma.node.findMany({
      where: { flowId, flow: { projectId } },
      orderBy: { createdAt: 'desc' },
    })
  }
}
