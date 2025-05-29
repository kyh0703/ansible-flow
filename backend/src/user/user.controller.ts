import {
  Controller,
  Get,
  Logger,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PaginationUserDto } from './dto/pagination-user.dto'
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger'

@ApiTags('users')
@Controller('users')
export class UserController {
  private logger: Logger = new Logger(UserController.name)

  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '유저 페이징 목록 조회' })
  @ApiResponse({
    status: 200,
    description: 'Fiber 스타일 페이징 유저 목록 반환',
  })
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
  async pagination(@Query() query: PaginationUserDto) {
    const pageNum = Math.max(Number(query.page || 1), 1)
    const pageSizeNum = Math.max(Number(query.pageSize || 10), 1)
    const skip = (pageNum - 1) * pageSizeNum
    const { items, total } = await this.userService.pagination({
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

  @ApiOperation({ summary: '유저 단건 조회' })
  @ApiResponse({ status: 200, description: '유저 반환' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id)
  }

  @ApiOperation({ summary: '유저 생성' })
  @ApiResponse({ status: 201, description: '생성된 유저 반환' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @ApiOperation({ summary: '유저 수정' })
  @ApiResponse({ status: 200, description: '수정된 유저 반환' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }

  @ApiOperation({ summary: '유저 삭제' })
  @ApiResponse({ status: 200, description: '삭제된 유저 반환' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id)
  }
}
