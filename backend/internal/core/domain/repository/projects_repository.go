package repository

import (
	"context"

	"github.com/kyh0703/flow/internal/core/domain/model"
)

//counterfeiter:generate . ProjectsRepository
type ProjectsRepository interface {
	CreateOne(ctx context.Context, arg model.CreateProjectParams) (model.Project, error)
	FindByID(ctx context.Context, id int64) (model.Project, error)
	UpdateOne(ctx context.Context, arg model.PatchProjectParams) error
	DeleteOne(ctx context.Context, id int64) error
	Pagination(ctx context.Context, userID int64, offset int, limit int) ([]model.Project, int64, error)
}
