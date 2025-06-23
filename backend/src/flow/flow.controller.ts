import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Logger,
} from '@nestjs/common'
import { FlowService } from './flow.service'
import { CreateFlowDto } from './dto/create-flow.dto'
import { FlowPaginationResponseDto } from './dto/flow-pagination-response.dto'
import { UpdateFlowDto } from './dto/update-flow.dto'
import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'

@ApiTags('flows')
@Controller('projects/:projectId/flows')
export class FlowController {
  private logger = new Logger(FlowController.name)

  constructor(private readonly flowService: FlowService) {}

  @ApiOperation({ summary: '플로우 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '플로우 목록 반환',
    type: FlowPaginationResponseDto,
  })
  @ApiParam({ name: 'projectId', description: '프로젝트 ID' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Param('projectId') projectId: string,
    @Query() query: PaginationQueryDto,
  ): Promise<FlowPaginationResponseDto> {
    const { page = 1, pageSize = 10 } = query
    const skip = (page - 1) * pageSize
    const { items, total } = await this.flowService.findAll({
      projectId,
      skip,
      take: pageSize,
    })
    const totalPages = Math.ceil(total / pageSize)
    return {
      data: items,
      meta: {
        total,
        page,
        pageSize,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    }
  }

  @ApiOperation({ summary: '플로우 단건 조회' })
  @ApiResponse({ status: 200, description: '플로우 반환' })
  @ApiParam({ name: 'projectId', description: '프로젝트 ID' })
  @ApiParam({ name: 'id', description: '플로우 ID' })
  @Get(':id')
  async findOne(
    @Param('projectId') projectId: string,
    @Param('id') id: string,
  ) {
    return this.flowService.findOne(projectId, id)
  }

  @ApiOperation({ summary: '플로우 생성' })
  @ApiResponse({ status: 201, description: '생성된 플로우 반환' })
  @ApiParam({ name: 'projectId', description: '프로젝트 ID' })
  @Post()
  async create(
    @Param('projectId') projectId: string,
    @Body() createFlowDto: CreateFlowDto,
  ) {
    return this.flowService.create(projectId, createFlowDto)
  }

  @ApiOperation({ summary: '플로우 수정' })
  @ApiResponse({ status: 200, description: '수정된 플로우 반환' })
  @ApiParam({ name: 'projectId', description: '프로젝트 ID' })
  @ApiParam({ name: 'id', description: '플로우 ID' })
  @Patch(':id')
  async update(
    @Param('projectId') projectId: string,
    @Param('id') id: string,
    @Body() updateFlowDto: UpdateFlowDto,
  ) {
    return this.flowService.update(projectId, id, updateFlowDto)
  }

  @ApiOperation({ summary: '플로우 삭제' })
  @ApiResponse({ status: 200, description: '삭제된 플로우 반환' })
  @ApiParam({ name: 'projectId', description: '프로젝트 ID' })
  @ApiParam({ name: 'id', description: '플로우 ID' })
  @Delete(':id')
  async delete(@Param('projectId') projectId: string, @Param('id') id: string) {
    return this.flowService.delete(projectId, id)
  }

  @ApiOperation({ summary: '플로우 구조 조회' })
  @ApiResponse({ status: 200, description: '플로우 구조 반환' })
  @ApiParam({ name: 'projectId', description: '프로젝트 ID' })
  @ApiParam({ name: 'id', description: '플로우 ID' })
  @Get(':id/structure')
  async findStructure(
    @Param('projectId') projectId: string,
    @Param('id') id: string,
  ) {
    return this.flowService.findStructure(projectId, id)
  }
}
