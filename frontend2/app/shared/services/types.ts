import { errorMessages, type ErrorCode } from '@/shared/constants/http-error'

export type ApiResponse<T> = {
  statusCode: number
  message: string | string[]
  data: T
  error?: string | object
}

export class CustomError extends Error {
  public code: ErrorCode
  public message: string
  public status: number

  constructor(code: number, status: number, message: string) {
    super(message ?? errorMessages.get(code) ?? 'Unknown error')
    this.code = code
    this.message = errorMessages.get(code) ?? message ?? 'Unknown error'
    this.status = status
    this.name = 'CustomError'
  }
}
