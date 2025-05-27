import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Node } from 'generated/client'
import { CreateNodeDto } from './dto/create-node.dto'
import { UpdateNodeDto } from './dto/update-node.dto'

@Injectable()
export class NodeService {
  constructor(private readonly prisma: PrismaService) {}

  // 노드 다건 생성
  async createMany(
    projectId: string,
    flowId: string,
    createNodeDtos: CreateNodeDto[],
  ): Promise<Node[]> {
    const data = createNodeDtos.map((dto) => ({ ...dto, flowId }))
    await this.prisma.node.createMany({ data })
    return this.findMany(projectId, flowId)
  }

  // 노드 다건 수정
  async updateMany(
    projectId: string,
    flowId: string,
    updateNodeDtos: UpdateNodeDto[],
  ): Promise<Node[]> {
    const results: Node[] = []
    for (const dto of updateNodeDtos) {
      if (!dto.id) throw new NotFoundException('id is required for update')
      // flowId, projectId 일치 검증
      const node = await this.findOne(projectId, flowId, dto.id)
      const updated = await this.prisma.node.update({
        where: { id: dto.id },
        data: dto,
      })
      results.push(updated)
    }
    return results
  }

  // 노드 다건 삭제
  async deleteMany(
    projectId: string,
    flowId: string,
    ids: string[],
  ): Promise<string[]> {
    // 소유권 검증
    for (const id of ids) {
      await this.findOne(projectId, flowId, id)
    }
    await this.prisma.node.deleteMany({ where: { id: { in: ids }, flowId } })
    return ids
  }

  // 노드 단건 조회
  async findOne(projectId: string, flowId: string, id: string): Promise<Node> {
    const node = await this.prisma.node.findFirst({
      where: { id, flowId, flow: { projectId } },
    })
    if (!node) throw new NotFoundException('Node not found')
    return node
  }

  // (옵션) 플로우 하위 전체 노드 조회
  async findMany(projectId: string, flowId: string): Promise<Node[]> {
    return this.prisma.node.findMany({
      where: { flowId, flow: { projectId } },
      orderBy: { createdAt: 'desc' },
    })
  }
}
