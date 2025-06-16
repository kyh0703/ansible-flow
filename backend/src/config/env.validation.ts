import { plainToInstance } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsString, validateSync } from 'class-validator'

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment

  @IsNotEmpty()
  @IsString()
  FRONTEND_URL: string

  @IsNotEmpty()
  @IsString()
  JWT_ACCESS_TOKEN_SECRET: string

  @IsNotEmpty()
  @IsString()
  JWT_ACCESS_TOKEN_EXPIRES_IN: string

  @IsNotEmpty()
  @IsString()
  JWT_REFRESH_TOKEN_SECRET: string

  @IsNotEmpty()
  @IsString()
  JWT_REFRESH_TOKEN_EXPIRES_IN: string

  @IsString()
  GOOGLE_CLIENT_ID: string

  @IsString()
  GOOGLE_CLIENT_SECRET: string

  @IsString()
  GOOGLE_REDIRECT_URL: string

  @IsString()
  GOOGLE_SCOPES: string

  @IsString()
  KAKAO_CLIENT_ID: string

  @IsString()
  KAKAO_CLIENT_SECRET: string

  @IsString()
  KAKAO_REDIRECT_URL: string

  @IsString()
  KAKAO_SCOPES: string

  @IsString()
  GITHUB_CLIENT_ID: string

  @IsString()
  GITHUB_CLIENT_SECRET: string

  @IsString()
  GITHUB_REDIRECT_URL: string
}

export function validate(config: Record<string, unknown>) {
  const validateConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  })
  const errors = validateSync(validateConfig, { skipMissingProperties: false })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }

  return validateConfig
}
