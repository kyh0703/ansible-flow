import { IsString, IsOptional, IsObject } from 'class-validator'
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger'

export class UpdateNodeDto {
  @ApiProperty({ description: '노드 id' })
  @IsString()
  id: string

  @ApiPropertyOptional({ description: '소속 플로우 ID' })
  @IsOptional()
  @IsString()
  flowId?: string

  @ApiPropertyOptional({ description: '노드 식별자' })
  @IsOptional()
  @IsString()
  nodeId?: string

  @ApiPropertyOptional({ description: '노드 종류' })
  @IsOptional()
  @IsString()
  kind?: string

  @ApiPropertyOptional({ description: '노드 설명' })
  @IsOptional()
  @IsString()
  desc?: string

  @ApiPropertyOptional({ description: '노드 라벨' })
  @IsOptional()
  @IsString()
  label?: string

  @ApiPropertyOptional({ description: '노드 그룹 정보' })
  @IsOptional()
  @IsObject()
  group?: object

  @ApiPropertyOptional({ description: '노드 그룹 ID' })
  @IsOptional()
  @IsString()
  groupId?: string

  @ApiPropertyOptional({ description: '노드 위치 정보' })
  @IsOptional()
  @IsObject()
  pos?: object

  @ApiPropertyOptional({ description: '노드 스타일 정보' })
  @IsOptional()
  @IsObject()
  style?: object
}
