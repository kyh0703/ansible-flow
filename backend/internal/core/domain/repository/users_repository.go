package repository

import (
	"context"

	"github.com/kyh0703/flow/internal/core/domain/model"
)

//counterfeiter:generate . UsersRepository
type UsersRepository interface {
	CreateOne(ctx context.Context, arg model.CreateUserParams) (model.User, error)
	FindByID(ctx context.Context, id int64) (model.User, error)
	UpdateOne(ctx context.Context, arg model.UpdateUserParams) error
	DeleteOne(ctx context.Context, id int64) error
	FindByEmail(ctx context.Context, email string) (model.User, error)
}
