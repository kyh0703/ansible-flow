import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { FlowService } from './flow.service'
import { CreateFlowDto } from './dto/create-flow.dto'
import { UpdateFlowDto } from './dto/update-flow.dto'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('flows')
@Controller('flows')
export class FlowController {
  constructor(private readonly flowService: FlowService) {}

  @ApiOperation({ summary: '플로우 목록 조회' })
  @ApiResponse({ status: 200, description: '플로우 목록 반환' })
  @Get()
  async findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('projectId') projectId?: string,
  ) {
    return this.flowService.findAll({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      projectId,
    })
  }

  @ApiOperation({ summary: '플로우 단건 조회' })
  @ApiResponse({ status: 200, description: '플로우 반환' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.flowService.findOne(id)
  }

  @ApiOperation({ summary: '플로우 생성' })
  @ApiResponse({ status: 201, description: '생성된 플로우 반환' })
  @Post()
  async create(@Body() createFlowDto: CreateFlowDto) {
    return this.flowService.create(createFlowDto)
  }

  @ApiOperation({ summary: '플로우 수정' })
  @ApiResponse({ status: 200, description: '수정된 플로우 반환' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFlowDto: UpdateFlowDto) {
    return this.flowService.update(id, updateFlowDto)
  }

  @ApiOperation({ summary: '플로우 삭제' })
  @ApiResponse({ status: 200, description: '삭제된 플로우 반환' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.flowService.delete(id)
  }
}
