package project

type UpdateProjectDto struct {
	Name        *string `json:"name"`
	Description *string `json:"description"`
}
