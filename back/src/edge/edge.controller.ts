import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common'
import { EdgeService } from './edge.service'
import { CreateEdgeDto } from './dto/create-edge.dto'
import { UpdateEdgeDto } from './dto/update-edge.dto'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger'

@ApiTags('edges')
@Controller('edges')
export class EdgeController {
  constructor(private readonly edgeService: EdgeService) {}

  @ApiOperation({ summary: '에지 다건 조회' })
  @ApiResponse({ status: 200, description: '에지 목록 반환' })
  @ApiQuery({
    name: 'ids',
    required: false,
    type: [String],
    description: '에지 id 배열',
  })
  @Get()
  async findMany(@Query('ids') ids?: string[]) {
    return this.edgeService.findMany(ids)
  }

  @ApiOperation({ summary: '에지 다건 생성' })
  @ApiResponse({ status: 201, description: '생성된 에지 목록 반환' })
  @ApiBody({ type: [CreateEdgeDto] })
  @Post()
  async createMany(@Body() createEdgeDtos: CreateEdgeDto[]) {
    return this.edgeService.createMany(createEdgeDtos)
  }

  @ApiOperation({ summary: '에지 다건 수정' })
  @ApiResponse({ status: 200, description: '수정된 에지 목록 반환' })
  @ApiBody({ type: [UpdateEdgeDto] })
  @Patch()
  async updateMany(@Body() updateEdgeDtos: UpdateEdgeDto[]) {
    return this.edgeService.updateMany(updateEdgeDtos)
  }

  @ApiOperation({ summary: '에지 다건 삭제' })
  @ApiResponse({ status: 200, description: '삭제된 에지 id 목록 반환' })
  @ApiBody({
    schema: {
      properties: { ids: { type: 'array', items: { type: 'string' } } },
    },
  })
  @Delete()
  async deleteMany(@Body('ids') ids: string[]) {
    return this.edgeService.deleteMany(ids)
  }
}
