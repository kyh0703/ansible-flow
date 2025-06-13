import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator'

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  password: string
}
