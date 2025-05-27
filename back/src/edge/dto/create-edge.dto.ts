import { IsString, IsOptional, IsObject, IsBoolean } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateEdgeDto {
  @ApiProperty({ description: '소속 플로우 ID' })
  @IsString()
  flowId: string

  @ApiProperty({ description: '에지 식별자' })
  @IsString()
  edgeId: string

  @ApiProperty({ description: '에지 종류' })
  @IsString()
  kind: string

  @ApiProperty({ description: '출발 노드 ID' })
  @IsString()
  srcNodeId: string

  @ApiProperty({ description: '도착 노드 ID' })
  @IsString()
  dstNodeId: string

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
