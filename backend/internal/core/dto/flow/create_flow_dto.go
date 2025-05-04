package flow

type CreateFlowDto struct {
	ProjectID   int    `json:"project_id" validate:"required"`
	Name        string `json:"name" validate:"required"`
	Description string `json:"description" validate:"required"`
}
