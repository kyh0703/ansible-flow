export interface ApiResponse<T> {
  statusCode: number
  message: string | string[]
  data?: T
  error?: string | object
}
