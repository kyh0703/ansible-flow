package repository

import (
	"context"

	"github.com/kyh0703/flow/internal/core/domain/model"
)

//counterfeiter:generate . FlowsRepository
type FlowsRepository interface {
	CreateOne(ctx context.Context, arg model.CreateFlowParams) (model.Flow, error)
	FindByID(ctx context.Context, id int64) (model.Flow, error)
	UpdateOne(ctx context.Context, arg model.PatchFlowParams) error
	DeleteOne(ctx context.Context, id int64) error
	Pagination(ctx context.Context, projectID int64, offset int, limit int) ([]model.Flow, int64, error)
}
