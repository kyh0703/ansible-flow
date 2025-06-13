import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator'

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  passwordConfirm: string

  @IsString()
  @IsOptional()
  name?: string
}
