import { IsString, IsOptional, IsBoolean } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateFlowDto {
  @ApiPropertyOptional({ description: '소속 프로젝트 ID' })
  @IsOptional()
  @IsString()
  projectId?: string

  @ApiPropertyOptional({ description: '플로우 이름' })
  @IsOptional()
  @IsString()
  name?: string

  @ApiPropertyOptional({ description: '플로우 설명' })
  @IsOptional()
  @IsBoolean()
  bookmarked?: boolean
}
