package repository

import (
	"context"

	"github.com/kyh0703/flow/internal/core/domain/model"
)

//counterfeiter:generate . EdgesRepository
type EdgesRepository interface {
	CreateAll(ctx context.Context, arg []model.CreateEdgeParams) ([]model.Edge, error)
	FindByID(ctx context.Context, id int64) (model.Edge, error)
	UpdateAll(ctx context.Context, arg []model.PatchEdgeParams) error
	DeleteAll(ctx context.Context, ids []int64) error
	FindByFlowID(ctx context.Context, flowID int64) ([]model.Edge, error)
}
