import { IsString, IsOptional } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateFlowDto {
  @ApiProperty({ description: '소속 프로젝트 ID' })
  @IsString()
  projectId: string

  @ApiProperty({ description: '테넌트 ID' })
  @IsString()
  tenantId: string

  @ApiProperty({ description: '서비스 ID' })
  @IsString()
  serviceId: string

  @ApiProperty({ description: '버전' })
  @IsString()
  version: string

  @ApiProperty({ description: '플로우 이름' })
  @IsString()
  name: string

  @ApiPropertyOptional({ description: '플로우 설명' })
  @IsOptional()
  @IsString()
  desc?: string

  @ApiPropertyOptional({ description: '플로우 타입' })
  @IsOptional()
  @IsString()
  type?: string
}
