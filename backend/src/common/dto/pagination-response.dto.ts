export class PaginationMeta {
  total: number
  page: number
  pageSize: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export class PaginationResponseDto<T> {
  data: T[]
  meta: PaginationMeta
}