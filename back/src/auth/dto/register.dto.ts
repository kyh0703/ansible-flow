import { IsString, IsNotEmpty, IsOptional, IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(6)
  passwordConfirm: string;

  @IsString()
  @IsOptional()
  name?: string;
}
