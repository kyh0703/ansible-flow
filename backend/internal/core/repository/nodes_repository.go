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

func (n *nodesRepository) CreateAll(ctx context.Context, arg []model.CreateNodeParams) ([]model.Node, error) {
	panic("unimplemented")
}

func (n *nodesRepository) DeleteAll(ctx context.Context, ids []int64) error {
	panic("unimplemented")
}

func (n *nodesRepository) FindByID(ctx context.Context, id int64) (model.Node, error) {
	panic("unimplemented")
}

func (n *nodesRepository) UpdateAll(ctx context.Context, arg []model.PatchNodeParams) error {
	panic("unimplemented")
}

func (n *nodesRepository) FindByFlowID(ctx context.Context, flowID int64) ([]model.Node, error) {
	return n.queries.ListNodesByFlowID(ctx, flowID)
}
