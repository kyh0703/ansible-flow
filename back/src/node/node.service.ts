import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Node } from 'generated/client'
import { CreateNodeDto } from './dto/create-node.dto'
import { UpdateNodeDto } from './dto/update-node.dto'

@Injectable()
export class NodeService {
  constructor(private readonly prisma: PrismaService) {}

  // 노드 다건 조회
  async findMany(ids?: string[]): Promise<Node[]> {
    if (ids && ids.length > 0) {
      return this.prisma.node.findMany({
        where: { id: { in: ids } },
        orderBy: { createdAt: 'desc' },
      })
    }
    return this.prisma.node.findMany({ orderBy: { createdAt: 'desc' } })
  }

  // 노드 다건 생성
  async createMany(createNodeDtos: CreateNodeDto[]): Promise<Node[]> {
    const created = await this.prisma.node.createMany({ data: createNodeDtos })
    // createMany는 생성된 개수만 반환하므로, 실제 생성된 노드 목록을 반환하려면 findMany로 재조회
    // (실제 서비스에서는 트랜잭션 처리 권장)
    return this.findMany() // 전체 반환 or 필요시 ids로 조회
  }

  // 노드 다건 수정
  async updateMany(updateNodeDtos: UpdateNodeDto[]): Promise<Node[]> {
    const results: Node[] = []
    for (const dto of updateNodeDtos) {
      if (!dto.id) throw new NotFoundException('id is required for update')
      const updated = await this.prisma.node.update({
        where: { id: dto.id },
        data: dto,
      })
      results.push(updated)
    }
    return results
  }

  // 노드 다건 삭제
  async deleteMany(ids: string[]): Promise<string[]> {
    await this.prisma.node.deleteMany({ where: { id: { in: ids } } })
    return ids
  }
}
