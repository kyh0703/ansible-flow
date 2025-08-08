import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { ProjectMembershipGuard } from 'src/project/guards/project-membership.guard'
import { CreateEdgeDto } from './dto/create-edge.dto'
import { UpdateEdgeDto } from './dto/update-edge.dto'
import { EdgeService } from './edge.service'

@ApiTags('edges')
@Controller('projects/:projectId/flows/:flowId/edges')
export class EdgeController {
  private readonly logger = new Logger(EdgeController.name)

  constructor(private readonly edgeService: EdgeService) {}

  @ApiOperation({ summary: '에지 다건 생성' })
  @ApiResponse({ status: 201, description: '생성된 에지 목록 반환' })
  @ApiParam({ name: 'projectId', description: '프로젝트 ID' })
  @ApiParam({ name: 'flowId', description: '플로우 ID' })
  @ApiBody({ type: [CreateEdgeDto] })
  @UseGuards(JwtAuthGuard, ProjectMembershipGuard)
  @Post()
  async createMany(
    @Param('projectId') projectId: string,
    @Param('flowId') flowId: string,
    @Body() createEdgeDtos: CreateEdgeDto[],
  ) {
    return this.edgeService.createMany(projectId, flowId, createEdgeDtos)
  }

  @ApiOperation({ summary: '에지 다건 수정' })
  @ApiResponse({ status: 200, description: '수정된 에지 목록 반환' })
  @ApiParam({ name: 'projectId', description: '프로젝트 ID' })
  @ApiParam({ name: 'flowId', description: '플로우 ID' })
  @ApiBody({ type: [UpdateEdgeDto] })
  @UseGuards(JwtAuthGuard, ProjectMembershipGuard)
  @Patch()
  async updateMany(
    @Param('projectId') projectId: string,
    @Param('flowId') flowId: string,
    @Body() updateEdgeDtos: UpdateEdgeDto[],
  ) {
    return this.edgeService.updateMany(projectId, flowId, updateEdgeDtos)
  }

  @ApiOperation({ summary: '에지 다건 삭제' })
  @ApiResponse({ status: 200, description: '삭제된 에지 id 목록 반환' })
  @ApiParam({ name: 'projectId', description: '프로젝트 ID' })
  @ApiParam({ name: 'flowId', description: '플로우 ID' })
  @ApiBody({
    schema: {
      type: 'array',
      items: { type: 'string' },
    },
  })
  @UseGuards(JwtAuthGuard, ProjectMembershipGuard)
  @Delete()
  async deleteMany(
    @Param('projectId') projectId: string,
    @Param('flowId') flowId: string,
    @Body() ids: string[],
  ) {
    return this.edgeService.deleteMany(projectId, flowId, ids)
  }

  @ApiOperation({ summary: '에지 단건 조회' })
  @ApiResponse({ status: 200, description: '에지 반환' })
  @ApiParam({ name: 'projectId', description: '프로젝트 ID' })
  @ApiParam({ name: 'flowId', description: '플로우 ID' })
  @ApiParam({ name: 'id', description: '에지 ID' })
  @UseGuards(JwtAuthGuard, ProjectMembershipGuard)
  @Get(':id')
  async findOne(
    @Param('projectId') projectId: string,
    @Param('flowId') flowId: string,
    @Param('id') id: string,
  ) {
    return this.edgeService.findOne(projectId, flowId, id)
  }
}
