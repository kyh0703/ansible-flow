package service

import (
	"context"

	"github.com/kyh0703/flow/internal/core/domain/model"
)

type GoogleUserInfo struct {
	ID            string `json:"id"`
	Email         string `json:"email"`
	VerifiedEmail bool   `json:"verified_email"`
	Name          string `json:"name"`
	Picture       string `json:"picture"`
}

type OAuthService interface {
	GetGoogleAuthURL(state string, redirectURL string) string
	HandleGoogleCallback(ctx context.Context, code string, state string) (*model.User, error)
}
