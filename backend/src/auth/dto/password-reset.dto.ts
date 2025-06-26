import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'
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

  @ApiProperty({ description: '새로운 비밀번호' })
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string

  @ApiProperty({ description: '비밀번호 확인' })
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  passwordConfirm: string
}
