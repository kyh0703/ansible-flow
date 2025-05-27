import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common'
import { NodeService } from './node.service'
import { CreateNodeDto } from './dto/create-node.dto'
import { UpdateNodeDto } from './dto/update-node.dto'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger'

@ApiTags('nodes')
@Controller('projects/:projectId/flows/:flowId/nodes')
export class NodeController {
  constructor(private readonly nodeService: NodeService) {}

  @ApiOperation({ summary: '노드 다건 생성' })
  @ApiResponse({ status: 201, description: '생성된 노드 목록 반환' })
  @ApiParam({ name: 'projectId', description: '프로젝트 ID' })
  @ApiParam({ name: 'flowId', description: '플로우 ID' })
  @ApiBody({ type: [CreateNodeDto] })
  @Post()
  async createMany(
    @Param('projectId') projectId: string,
    @Param('flowId') flowId: string,
    @Body() createNodeDtos: CreateNodeDto[],
  ) {
    return this.nodeService.createMany(projectId, flowId, createNodeDtos)
  }

  @ApiOperation({ summary: '노드 단건 조회' })
  @ApiResponse({ status: 200, description: '노드 반환' })
  @ApiParam({ name: 'projectId', description: '프로젝트 ID' })
  @ApiParam({ name: 'flowId', description: '플로우 ID' })
  @ApiParam({ name: 'id', description: '노드 ID' })
  @Get(':id')
  async findOne(
    @Param('projectId') projectId: string,
    @Param('flowId') flowId: string,
    @Param('id') id: string,
  ) {
    return this.nodeService.findOne(projectId, flowId, id)
  }

  @ApiOperation({ summary: '노드 다건 수정' })
  @ApiResponse({ status: 200, description: '수정된 노드 목록 반환' })
  @ApiParam({ name: 'projectId', description: '프로젝트 ID' })
  @ApiParam({ name: 'flowId', description: '플로우 ID' })
  @ApiBody({ type: [UpdateNodeDto] })
  @Patch()
  async updateMany(
    @Param('projectId') projectId: string,
    @Param('flowId') flowId: string,
    @Body() updateNodeDtos: UpdateNodeDto[],
  ) {
    return this.nodeService.updateMany(projectId, flowId, updateNodeDtos)
  }

  @ApiOperation({ summary: '노드 다건 삭제' })
  @ApiResponse({ status: 200, description: '삭제된 노드 id 목록 반환' })
  @ApiParam({ name: 'projectId', description: '프로젝트 ID' })
  @ApiParam({ name: 'flowId', description: '플로우 ID' })
  @ApiBody({
    schema: {
      properties: { ids: { type: 'array', items: { type: 'string' } } },
    },
  })
  @Delete()
  async deleteMany(
    @Param('projectId') projectId: string,
    @Param('flowId') flowId: string,
    @Body('ids') ids: string[],
  ) {
    return this.nodeService.deleteMany(projectId, flowId, ids)
  }
}
