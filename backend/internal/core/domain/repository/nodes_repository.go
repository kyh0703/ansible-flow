package repository

import (
	"context"

	"github.com/kyh0703/flow/internal/core/domain/model"
)

//counterfeiter:generate . NodesRepository
type NodesRepository interface {
	CreateOne(ctx context.Context, arg model.CreateNodeParams) (model.Node, error)
	FindByID(ctx context.Context, id int64) (model.Node, error)
	UpdateOne(ctx context.Context, arg model.PatchNodeParams) error
	DeleteOne(ctx context.Context, id int64) error
}
