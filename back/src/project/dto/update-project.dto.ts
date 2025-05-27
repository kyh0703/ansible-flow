import { IsString, IsOptional } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateProjectDto {
  @ApiPropertyOptional({ description: '프로젝트 이름' })
  @IsOptional()
  @IsString()
  name?: string

  @ApiPropertyOptional({ description: '프로젝트 설명' })
  @IsOptional()
  @IsString()
  description?: string
}
