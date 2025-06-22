import { Type } from 'class-transformer'
import { IsOptional, IsPositive, Max, Min } from 'class-validator'

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @Min(1)
  page?: number = 1

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @Min(1)
  @Max(100)
  pageSize?: number = 10
}