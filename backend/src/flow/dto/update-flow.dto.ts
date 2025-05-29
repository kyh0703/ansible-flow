import { IsString, IsOptional } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateFlowDto {
  @ApiPropertyOptional({ description: '소속 프로젝트 ID' })
  @IsOptional()
  @IsString()
  projectId?: string

  @ApiPropertyOptional({ description: '테넌트 ID' })
  @IsOptional()
  @IsString()
  tenantId?: string

  @ApiPropertyOptional({ description: '서비스 ID' })
  @IsOptional()
  @IsString()
  serviceId?: string

  @ApiPropertyOptional({ description: '버전' })
  @IsOptional()
  @IsString()
  version?: string

  @ApiPropertyOptional({ description: '플로우 이름' })
  @IsOptional()
  @IsString()
  name?: string

  @ApiPropertyOptional({ description: '플로우 설명' })
  @IsOptional()
  @IsString()
  desc?: string

  @ApiPropertyOptional({ description: '플로우 타입' })
  @IsOptional()
  @IsString()
  type?: string
}
