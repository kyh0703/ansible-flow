package project

type CreateDto struct {
	Name        string `json:"name" validate:"required"`
	Description string `json:"description" validate:"required"`
}
