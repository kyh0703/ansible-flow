import { IsString, IsOptional, IsObject, IsBoolean } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateEdgeDto {
  @ApiPropertyOptional({ description: '에지 ID' })
  @IsOptional()
  @IsString()
  id?: string

  @ApiPropertyOptional({ description: '에지 UUID' })
  @IsOptional()
  @IsString()
  uuid?: string

  @ApiPropertyOptional({ description: '소속 플로우 ID' })
  @IsOptional()
  @IsString()
  flowId?: string

  @ApiPropertyOptional({ description: '출발 노드 ID' })
  @IsOptional()
  @IsString()
  source?: string

  @ApiPropertyOptional({ description: '도착 노드 ID' })
  @IsOptional()
  @IsString()
  target?: string

  @ApiPropertyOptional({ description: '에지 타입' })
  @IsOptional()
  @IsString()
  type?: string

  @ApiPropertyOptional({ description: '에지 라벨' })
  @IsOptional()
  @IsString()
  label?: string

  @ApiPropertyOptional({ description: '숨김 여부' })
  @IsOptional()
  @IsBoolean()
  hidden?: boolean

  @ApiPropertyOptional({ description: '마커 정보' })
  @IsOptional()
  @IsObject()
  markerEnd?: object
}
