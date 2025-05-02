package project

type ProjectDto struct {
	ID          int64  `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	UpdateAt    string `json:"updateAt"`
	CreateAt    string `json:"createAt"`
}
