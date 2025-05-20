import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class OAuthUserDto {
  @IsString()
  @IsNotEmpty()
  provider: string;

  @IsString()
  @IsNotEmpty()
  providerId: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  profileImage?: string;
}