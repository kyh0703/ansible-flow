package project

type ListProjectRequest struct {
	Page     *int `query:"page" validate:"required"`
	PageSize *int `query:"pageSize" validate:"required,min=1,max=100"`
}
