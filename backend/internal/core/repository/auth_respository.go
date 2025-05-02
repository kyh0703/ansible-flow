package repository

import (
	"context"
	"database/sql"

	"github.com/kyh0703/flow/internal/core/domain/model"
	"github.com/kyh0703/flow/internal/core/domain/repository"
)

type authRepository struct {
	db      *sql.DB
	queries *model.Queries
}

func NewAuthRepository(
	db *sql.DB,
	queries *model.Queries,
) repository.AuthRepository {
	return &authRepository{
		db:      db,
		queries: queries,
	}
}

func (a *authRepository) CreateOne(ctx context.Context, arg model.CreateTokenParams) (model.Token, error) {
	return a.queries.CreateToken(ctx, arg)
}

func (a *authRepository) FindByID(ctx context.Context, id int64) (model.Token, error) {
	return a.queries.GetToken(ctx, id)
}

func (a *authRepository) FindByUserID(ctx context.Context, userID int64) (model.Token, error) {
	return a.queries.GetTokenByUserID(ctx, userID)
}

func (a *authRepository) GetList(ctx context.Context) ([]model.Token, error) {
	return a.queries.ListTokens(ctx)
}

func (a *authRepository) UpdateOne(ctx context.Context, arg model.UpdateTokenParams) error {
	return a.queries.UpdateToken(ctx, arg)
}

func (a *authRepository) DeleteOne(ctx context.Context, id int64) error {
	return a.queries.DeleteToken(ctx, id)
}
