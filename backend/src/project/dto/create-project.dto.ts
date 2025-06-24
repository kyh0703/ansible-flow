import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateProjectDto {
  @ApiProperty({ description: '프로젝트 이름' })
  @IsString()
  name: string
}
