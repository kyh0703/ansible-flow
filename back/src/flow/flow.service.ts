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
    skip?: number
    take?: number
    projectId?: string
  }): Promise<Flow[]> {
    const { skip, take, projectId } = params
    return this.prisma.flow.findMany({
      where: projectId ? { projectId } : undefined,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    })
  }

  // 플로우 단건 조회
  async findOne(id: string): Promise<Flow> {
    const flow = await this.prisma.flow.findUnique({ where: { id } })
    if (!flow) throw new NotFoundException('Flow not found')
    return flow
  }

  // 플로우 생성
  async create(createFlowDto: CreateFlowDto): Promise<Flow> {
    return this.prisma.flow.create({ data: createFlowDto })
  }

  // 플로우 수정
  async update(id: string, updateFlowDto: UpdateFlowDto): Promise<Flow> {
    return this.prisma.flow.update({ where: { id }, data: updateFlowDto })
  }

  // 플로우 삭제
  async delete(id: string): Promise<Flow> {
    return this.prisma.flow.delete({ where: { id } })
  }
}
