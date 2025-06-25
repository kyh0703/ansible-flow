import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RequestPasswordResetDto {
  @ApiProperty({ description: '비밀번호 재설정을 요청할 이메일 주소' })
  @IsEmail()
  email: string
}

export class ResetPasswordDto {
  @ApiProperty({ description: '비밀번호 재설정 토큰' })
  @IsString()
  @IsNotEmpty()
  token: string

  @ApiProperty({ description: '새로운 비밀번호 (최소 6자)' })
  @IsString()
  @MinLength(6)
  newPassword: string
}