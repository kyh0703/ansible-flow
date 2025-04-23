package service

import (
	"github.com/kyh0703/flow/internal/core/service/auth"
	"github.com/kyh0703/flow/internal/core/service/oauth"
	"go.uber.org/fx"
)

var Module = fx.Module(
	"service",
	fx.Provide(
		auth.NewAuthService,
		oauth.NewOAuthService,
	),
)
