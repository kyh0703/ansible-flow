import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Edge } from 'generated/client'
import { CreateEdgeDto } from './dto/create-edge.dto'
import { UpdateEdgeDto } from './dto/update-edge.dto'

@Injectable()
export class EdgeService {
  constructor(private readonly prisma: PrismaService) {}

  // 에지 다건 조회
  async findMany(ids?: string[]): Promise<Edge[]> {
    if (ids && ids.length > 0) {
      return this.prisma.edge.findMany({
        where: { id: { in: ids } },
        orderBy: { createdAt: 'desc' },
      })
    }
    return this.prisma.edge.findMany({ orderBy: { createdAt: 'desc' } })
  }

  // 에지 다건 생성
  async createMany(createEdgeDtos: CreateEdgeDto[]): Promise<Edge[]> {
    const created = await this.prisma.edge.createMany({ data: createEdgeDtos })
    return this.findMany() // 전체 반환 or 필요시 ids로 조회
  }

  // 에지 다건 수정
  async updateMany(updateEdgeDtos: UpdateEdgeDto[]): Promise<Edge[]> {
    const results: Edge[] = []
    for (const dto of updateEdgeDtos) {
      if (!dto.id) throw new NotFoundException('id is required for update')
      const updated = await this.prisma.edge.update({
        where: { id: dto.id },
        data: dto,
      })
      results.push(updated)
    }
    return results
  }

  // 에지 다건 삭제
  async deleteMany(ids: string[]): Promise<string[]> {
    await this.prisma.edge.deleteMany({ where: { id: { in: ids } } })
    return ids
  }
}
