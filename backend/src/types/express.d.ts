import type { User as PrismaUser } from 'generated/client'

declare global {
  namespace Express {
    interface Request {
      currentUser: PrismaUser
    }
  }
}
