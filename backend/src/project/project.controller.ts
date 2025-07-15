import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import type { User } from 'generated/client'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { CurrentUser } from 'src/user/user.decorator'
import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { CreateProjectDto } from './dto/create-project.dto'
import { ProjectPaginationResponseDto } from './dto/project-pagination-response.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { ProjectService } from './project.service'
import { ProjectMembershipGuard } from './guards/project-membership.guard'

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  private readonly logger = new Logger(ProjectController.name)

  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ summary: '프로젝트 페이징 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '프로젝트 페이징 목록 반환',
    type: ProjectPaginationResponseDto,
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async pagination(
    @CurrentUser() user: User,
    @Query() query: PaginationQueryDto,
  ): Promise<ProjectPaginationResponseDto> {
    const { page = 1, pageSize = 10 } = query
    const skip = (page - 1) * pageSize
    const { items, total } = await this.projectService.pagination({
      userId: user.id,
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

  @ApiOperation({ summary: '프로젝트 휴지통 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '프로젝트 휴지통 목록 반환',
    type: ProjectPaginationResponseDto,
  })
  @UseGuards(JwtAuthGuard, ProjectMembershipGuard)
  @Get('trashed')
  async trashedPagination(
    @CurrentUser() user: User,
    @Query() query: PaginationQueryDto,
  ): Promise<ProjectPaginationResponseDto> {
    const { page = 1, pageSize = 10 } = query
    const skip = (page - 1) * pageSize
    const { items, total } = await this.projectService.pagination({
      userId: user.id,
      skip,
      take: pageSize,
      trashed: true,
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

  @ApiOperation({ summary: '프로젝트 단건 조회' })
  @ApiResponse({ status: 200, description: '프로젝트 반환' })
  @UseGuards(JwtAuthGuard, ProjectMembershipGuard)
  @Get(':id')
  async findOne(@CurrentUser() user: User, @Param('id') id: string) {
    return this.projectService.findOne(id)
  }

  @ApiOperation({ summary: '프로젝트 생성' })
  @ApiResponse({ status: 201, description: '생성된 프로젝트 반환' })
  @UseGuards(JwtAuthGuard, ProjectMembershipGuard)
  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    console.log('user', user)
    return this.projectService.create({
      ...createProjectDto,
      userId: user.id,
    })
  }

  @ApiOperation({ summary: '프로젝트 수정' })
  @ApiResponse({ status: 200, description: '수정된 프로젝트 반환' })
  @UseGuards(JwtAuthGuard, ProjectMembershipGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(id, updateProjectDto)
  }

  @ApiOperation({ summary: '프로젝트 삭제' })
  @ApiResponse({ status: 200, description: '삭제된 프로젝트 반환' })
  @UseGuards(JwtAuthGuard, ProjectMembershipGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.projectService.delete(id)
  }
}
