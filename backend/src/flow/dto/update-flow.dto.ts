import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class UpdateFlowDto {
  @ApiPropertyOptional({ description: '플로우 이름' })
  @IsOptional()
  @IsString()
  name?: string

  @ApiPropertyOptional({ description: '플로우 즐겨찾기' })
  @IsOptional()
  @IsBoolean()
  starred?: boolean

  @ApiPropertyOptional({ description: '플로우 설명' })
  @IsOptional()
  @IsString()
  description?: string
}
