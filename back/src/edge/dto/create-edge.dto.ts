import { IsString, IsOptional, IsObject, IsBoolean } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateEdgeDto {
  @ApiProperty({ description: '에지 UUID' })
  @IsString()
  uuid: string

  @ApiProperty({ description: '소속 플로우 ID' })
  @IsString()
  flowId: string

  @ApiProperty({ description: '출발 노드 ID' })
  @IsString()
  source: string

  @ApiProperty({ description: '도착 노드 ID' })
  @IsString()
  target: string

  @ApiProperty({ description: '에지 타입' })
  @IsString()
  type: string

  @ApiPropertyOptional({ description: '에지 라벨' })
  @IsOptional()
  @IsString()
  label?: string

  @ApiPropertyOptional({ description: '숨김 여부' })
  @IsOptional()
  @IsBoolean()
  hidden?: boolean

  @ApiProperty({ description: '마커 정보' })
  @IsObject()
  markerEnd: object
}
