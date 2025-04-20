package project

type ListProjectRequest struct {
	Page     int `query:"page" validate:"required,min=1"`
	PageSize int `query:"page_size" validate:"required,min=1,max=100"`
}
