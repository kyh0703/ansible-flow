import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import type { User } from 'generated/client'
import { CurrentUser } from 'src/user/user.decorator'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { ProjectService } from './project.service'

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ summary: '프로젝트 페이징 목록 조회' })
  @ApiResponse({ status: 200, description: '프로젝트 페이징 목록 반환' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: '페이지 번호(1부터)',
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    type: Number,
    description: '페이지 크기',
  })
  @Get('pagination')
  async pagination(
    @CurrentUser() user: User,
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ) {
    const pageNum = Math.max(Number(page), 1)
    const pageSizeNum = Math.max(Number(pageSize), 1)
    const skip = (pageNum - 1) * pageSizeNum
    const { items, total } = await this.projectService.pagination({
      userId: user.id,
      skip,
      take: pageSizeNum,
    })
    const totalPages = Math.ceil(total / pageSizeNum)
    return {
      items,
      meta: {
        total,
        skip,
        take: pageSizeNum,
        hasMore: skip + pageSizeNum < total,
        page: pageNum,
        totalPages,
      },
    }
  }

  @ApiOperation({ summary: '프로젝트 단건 조회' })
  @ApiResponse({ status: 200, description: '프로젝트 반환' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.projectService.findOne(id)
  }

  @ApiOperation({ summary: '프로젝트 생성' })
  @ApiResponse({ status: 201, description: '생성된 프로젝트 반환' })
  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectService.create({
      ...createProjectDto,
      userId: user.id,
    })
  }

  @ApiOperation({ summary: '프로젝트 수정' })
  @ApiResponse({ status: 200, description: '수정된 프로젝트 반환' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(id, updateProjectDto)
  }

  @ApiOperation({ summary: '프로젝트 삭제' })
  @ApiResponse({ status: 200, description: '삭제된 프로젝트 반환' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.projectService.delete(id)
  }
}
