import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common'
import { NodeService } from './node.service'
import { CreateNodeDto } from './dto/create-node.dto'
import { UpdateNodeDto } from './dto/update-node.dto'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger'

@ApiTags('nodes')
@Controller('nodes')
export class NodeController {
  constructor(private readonly nodeService: NodeService) {}

  @ApiOperation({ summary: '노드 다건 조회' })
  @ApiResponse({ status: 200, description: '노드 목록 반환' })
  @ApiQuery({
    name: 'ids',
    required: false,
    type: [String],
    description: '노드 id 배열',
  })
  @Get()
  async findMany(@Query('ids') ids?: string[]) {
    return this.nodeService.findMany(ids)
  }

  @ApiOperation({ summary: '노드 다건 생성' })
  @ApiResponse({ status: 201, description: '생성된 노드 목록 반환' })
  @ApiBody({ type: [CreateNodeDto] })
  @Post()
  async createMany(@Body() createNodeDtos: CreateNodeDto[]) {
    return this.nodeService.createMany(createNodeDtos)
  }

  @ApiOperation({ summary: '노드 다건 수정' })
  @ApiResponse({ status: 200, description: '수정된 노드 목록 반환' })
  @ApiBody({ type: [UpdateNodeDto] })
  @Patch()
  async updateMany(@Body() updateNodeDtos: UpdateNodeDto[]) {
    return this.nodeService.updateMany(updateNodeDtos)
  }

  @ApiOperation({ summary: '노드 다건 삭제' })
  @ApiResponse({ status: 200, description: '삭제된 노드 id 목록 반환' })
  @ApiBody({
    schema: {
      properties: { ids: { type: 'array', items: { type: 'string' } } },
    },
  })
  @Delete()
  async deleteMany(@Body('ids') ids: string[]) {
    return this.nodeService.deleteMany(ids)
  }
}
