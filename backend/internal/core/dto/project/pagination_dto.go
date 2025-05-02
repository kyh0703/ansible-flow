package project

type PaginationDto struct {
	Page     int `query:"page"`
	PageSize int `query:"pageSize" validate:"required,min=1,max=100"`
}
