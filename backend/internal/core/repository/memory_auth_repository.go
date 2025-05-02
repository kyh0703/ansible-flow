package repository

import (
	"context"
	"database/sql"
	"fmt"
	"sync"
	"time"

	"github.com/kyh0703/flow/internal/core/domain/model"
	"github.com/kyh0703/flow/internal/core/domain/repository"
)

type memoryAuthRepository struct {
	mu     sync.RWMutex
	tokens map[int64]model.Token // key: token ID
	byUser map[int64]model.Token // key: user ID
	nextID int64
}

func NewMemoryAuthRepository() repository.AuthRepository {
	return &memoryAuthRepository{
		tokens: make(map[int64]model.Token),
		byUser: make(map[int64]model.Token),
		nextID: 1,
	}
}

func (r *memoryAuthRepository) CreateOne(ctx context.Context, arg model.CreateTokenParams) (model.Token, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	token := model.Token{
		ID:           r.nextID,
		UserID:       arg.UserID,
		RefreshToken: arg.RefreshToken,
		ExpiresIn:    arg.ExpiresIn,
		CreateAt:     sql.NullString{String: time.Now().Format(time.RFC3339), Valid: true},
	}

	r.tokens[token.ID] = token
	r.byUser[token.UserID] = token
	r.nextID++

	return token, nil
}

func (r *memoryAuthRepository) FindByID(ctx context.Context, id int64) (model.Token, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	if token, ok := r.tokens[id]; ok {
		return token, nil
	}
	return model.Token{}, fmt.Errorf("token not found")
}

func (r *memoryAuthRepository) FindByUserID(ctx context.Context, userID int64) (model.Token, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	if token, ok := r.byUser[userID]; ok {
		return token, nil
	}
	return model.Token{}, fmt.Errorf("token not found")
}

func (r *memoryAuthRepository) GetList(ctx context.Context) ([]model.Token, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	tokens := make([]model.Token, 0, len(r.tokens))
	for _, token := range r.tokens {
		tokens = append(tokens, token)
	}
	return tokens, nil
}

func (r *memoryAuthRepository) UpdateOne(ctx context.Context, arg model.UpdateTokenParams) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if token, ok := r.tokens[arg.ID]; ok {
		token.RefreshToken = arg.RefreshToken
		token.ExpiresIn = arg.ExpiresIn
		r.tokens[arg.ID] = token
		r.byUser[token.UserID] = token
		return nil
	}
	return fmt.Errorf("token not found")
}

func (r *memoryAuthRepository) DeleteOne(ctx context.Context, id int64) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if token, ok := r.tokens[id]; ok {
		delete(r.tokens, id)
		delete(r.byUser, token.UserID)
		return nil
	}
	return fmt.Errorf("token not found")
}
