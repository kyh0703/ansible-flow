import { registerAs } from '@nestjs/config'

export default registerAs('email', () => ({
  address: process.env.EMAIL_ADDRESS,
  password: process.env.EMAIL_PASSWORD,
}))
