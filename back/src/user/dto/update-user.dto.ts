import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateUserDto {
  @ApiPropertyOptional({ description: '이메일' })
  @IsOptional()
  @IsEmail()
  email?: string

  @ApiPropertyOptional({ description: '비밀번호', minLength: 6 })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string

  @ApiPropertyOptional({ description: '이름' })
  @IsOptional()
  @IsString()
  name?: string

  @ApiPropertyOptional({ description: '소개' })
  @IsOptional()
  @IsString()
  bio?: string
}
