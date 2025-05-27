import { IsString, IsOptional, IsObject, IsBoolean } from 'class-validator'
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger'

export class UpdateEdgeDto {
  @ApiProperty({ description: '에지 id' })
  @IsString()
  id: string

  @ApiPropertyOptional({ description: '소속 플로우 ID' })
  @IsOptional()
  @IsString()
  flowId?: string

  @ApiPropertyOptional({ description: '에지 식별자' })
  @IsOptional()
  @IsString()
  edgeId?: string

  @ApiPropertyOptional({ description: '에지 종류' })
  @IsOptional()
  @IsString()
  kind?: string

  @ApiPropertyOptional({ description: '출발 노드 ID' })
  @IsOptional()
  @IsString()
  srcNodeId?: string

  @ApiPropertyOptional({ description: '도착 노드 ID' })
  @IsOptional()
  @IsString()
  dstNodeId?: string

  @ApiPropertyOptional({ description: '에지 조건' })
  @IsOptional()
  @IsString()
  cond?: string

  @ApiPropertyOptional({ description: '에지 마커 정보' })
  @IsOptional()
  @IsObject()
  markerEnd?: object

  @ApiPropertyOptional({ description: '에지 포인트 정보' })
  @IsOptional()
  @IsObject()
  points?: object

  @ApiPropertyOptional({ description: '숨김 여부' })
  @IsOptional()
  @IsBoolean()
  hidden?: boolean
}
