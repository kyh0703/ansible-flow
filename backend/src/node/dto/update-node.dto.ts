import {
  IsString,
  IsOptional,
  IsObject,
  IsBoolean,
  IsInt,
} from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateNodeDto {
  @ApiPropertyOptional({ description: '노드 ID' })
  @IsOptional()
  @IsString()
  id?: string

  @ApiPropertyOptional({ description: '노드 UUID' })
  @IsOptional()
  @IsString()
  uuid?: string

  @ApiPropertyOptional({ description: '소속 플로우 ID' })
  @IsOptional()
  @IsString()
  flowId?: string

  @ApiPropertyOptional({ description: '노드 타입' })
  @IsOptional()
  @IsString()
  type?: string

  @ApiPropertyOptional({ description: '노드 위치 정보' })
  @IsOptional()
  @IsObject()
  position?: object

  @ApiPropertyOptional({ description: '노드 스타일 정보' })
  @IsOptional()
  @IsObject()
  style?: object

  @ApiPropertyOptional({ description: '노드 너비' })
  @IsOptional()
  @IsInt()
  width?: number

  @ApiPropertyOptional({ description: '노드 높이' })
  @IsOptional()
  @IsInt()
  height?: number

  @ApiPropertyOptional({ description: '숨김 여부' })
  @IsOptional()
  @IsBoolean()
  hidden?: boolean

  @ApiPropertyOptional({ description: '노드 설명' })
  @IsOptional()
  @IsString()
  description?: string
}
