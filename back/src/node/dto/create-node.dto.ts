import {
  IsString,
  IsOptional,
  IsObject,
  IsBoolean,
  IsInt,
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateNodeDto {
  @ApiProperty({ description: '노드 UUID' })
  @IsString()
  uuid: string

  @ApiProperty({ description: '소속 플로우 ID' })
  @IsString()
  flowId: string

  @ApiProperty({ description: '노드 타입' })
  @IsString()
  type: string

  @ApiProperty({ description: '노드 위치 정보' })
  @IsObject()
  position: object

  @ApiProperty({ description: '노드 스타일 정보' })
  @IsObject()
  styles: object

  @ApiProperty({ description: '노드 너비' })
  @IsInt()
  width: number

  @ApiProperty({ description: '노드 높이' })
  @IsInt()
  height: number

  @ApiPropertyOptional({ description: '숨김 여부' })
  @IsOptional()
  @IsBoolean()
  hidden?: boolean

  @ApiPropertyOptional({ description: '노드 설명' })
  @IsOptional()
  @IsString()
  description?: string
}
