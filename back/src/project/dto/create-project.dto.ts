import { IsString, IsOptional } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateProjectDto {
  @ApiProperty({ description: '프로젝트 이름' })
  @IsString()
  name: string

  @ApiPropertyOptional({ description: '프로젝트 설명' })
  @IsOptional()
  @IsString()
  description?: string
}
