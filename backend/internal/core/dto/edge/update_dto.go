package edge

type UpdateEdgesDto struct {
	Edges []EdgeDto `json:"edges" validate:"required"`
}
