package edge

type DeleteEdgesDto struct {
	IDs []int64 `json:"ids" validate:"required"`
}
