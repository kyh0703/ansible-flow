import { User } from 'generated/client'

interface AuthUserPayload {
  user: User
  token: {
    accessToken: string
    accessExpiresIn: number
    refreshToken: string
    refreshExpiresIn: number
  }
}

declare global {
  namespace Express {
    interface User extends AuthUserPayload {}
    interface Request {
      user?: AuthUserPayload
    }
  }
}
