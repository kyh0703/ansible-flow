package repository

import (
	"context"
	"database/sql"

	"github.com/kyh0703/flow/internal/core/domain/model"
	"github.com/kyh0703/flow/internal/core/domain/repository"
)

type nodesRepository struct {
	db      *sql.DB
	queries *model.Queries
}

func NewNodesRepository(
	db *sql.DB,
	queries *model.Queries,
) repository.NodesRepository {
	return &nodesRepository{
		db:      db,
		queries: queries,
	}
}

func (n *nodesRepository) CreateOne(ctx context.Context, arg model.CreateNodeParams) (model.Node, error) {
	return n.queries.CreateNode(ctx, arg)
}

func (n *nodesRepository) FindByID(ctx context.Context, id int64) (model.Node, error) {
	return n.queries.GetNode(ctx, id)
}

func (n *nodesRepository) UpdateOne(ctx context.Context, arg model.PatchNodeParams) error {
	return n.queries.PatchNode(ctx, arg)
}

func (n *nodesRepository) DeleteOne(ctx context.Context, id int64) error {
	return n.queries.DeleteNode(ctx, id)
}
