import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ description: '이메일' })
  @IsEmail()
  email: string

  @ApiProperty({ description: '비밀번호', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string

  @ApiProperty({ description: '이름' })
  @IsString()
  name: string

  @ApiPropertyOptional({ description: '소개' })
  @IsOptional()
  @IsString()
  bio?: string
}
