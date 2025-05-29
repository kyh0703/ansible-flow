import { IsOptional, IsInt, Min } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class PaginationUserDto {
  @ApiPropertyOptional({ description: '페이지 번호(1부터)', default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1

  @ApiPropertyOptional({ description: '페이지 크기', default: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  pageSize?: number = 10
}
