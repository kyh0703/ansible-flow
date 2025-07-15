import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class UpdateProjectDto {
  @ApiPropertyOptional({ description: '프로젝트 이름' })
  @IsOptional()
  @IsString()
  name?: string
}
