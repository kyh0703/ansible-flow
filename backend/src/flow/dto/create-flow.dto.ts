import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class CreateFlowDto {
  @ApiProperty({ description: '플로우 이름' })
  @IsString()
  name: string

  @ApiPropertyOptional({ description: '플로우 즐겨찾기' })
  @IsOptional()
  @IsBoolean()
  starred?: boolean
}
