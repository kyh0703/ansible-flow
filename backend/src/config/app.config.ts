import { registerAs } from '@nestjs/config'

export default registerAs('app', () => ({
  env: process.env.NODE_ENV,
  port: process.env.HTTP_PORT ?? 8000,
  cookieKey: process.env.COOKIE_KEY,
}))
