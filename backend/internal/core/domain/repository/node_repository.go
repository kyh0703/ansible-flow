package repository

import (
	"context"

	"github.com/kyh0703/flow/internal/core/domain/model"
)

//counterfeiter:generate . NodeRepository
type NodeRepository interface {
	CreateOne(ctx context.Context, params model.CreateNodeParams) (model.Node, error)
	FindOne(ctx context.Context, id int64) (model.Node, error)
	UpdateOne(ctx context.Context, params model.UpdateNodeParams) error
	DeleteOne(ctx context.Context, id int64) error
}
