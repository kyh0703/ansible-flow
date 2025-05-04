package repository

import (
	"context"

	"github.com/kyh0703/flow/internal/core/domain/model"
)

//counterfeiter:generate . NodesRepository
type NodesRepository interface {
	CreateAll(ctx context.Context, arg []model.CreateNodeParams) ([]model.Node, error)
	FindByID(ctx context.Context, id int64) (model.Node, error)
	UpdateAll(ctx context.Context, arg []model.PatchNodeParams) error
	DeleteAll(ctx context.Context, ids []int64) error
	FindByFlowID(ctx context.Context, flowID int64) ([]model.Node, error)
}
