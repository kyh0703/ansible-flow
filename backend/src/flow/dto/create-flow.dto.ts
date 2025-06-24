import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class CreateFlowDto {
  @ApiProperty({ description: '소속 프로젝트 ID' })
  @IsString()
  projectId: string

  @ApiProperty({ description: '플로우 이름' })
  @IsString()
  name: string

  @ApiPropertyOptional({ description: '플로우 즐겨찾기' })
  @IsOptional()
  @IsBoolean()
  bookmarked?: boolean
}
