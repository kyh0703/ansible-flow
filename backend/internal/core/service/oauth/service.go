package service

import (
	"context"

	"github.com/kyh0703/flow/internal/core/domain/model"
)

type OAuthService interface {
	GetGoogleAuthURL(state string, redirectURL string) string
	HandleGoogleCallback(ctx context.Context, code string, state string) (*model.User, error)
	GetKakaoAuthURL(state string, redirectURL string) string
	HandleKakaoCallback(ctx context.Context, code string, state string) (*model.User, error)
}
