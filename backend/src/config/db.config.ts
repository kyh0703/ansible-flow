import { registerAs } from '@nestjs/config'

export default registerAs('db', () => ({
  type: process.env.DB_TYPE,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST ?? 'localhost',
  port: process.env.DB_PORT ?? 5432,
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  synchronize: process.env.DB_SYNCHRONIZE ?? false,
}))
