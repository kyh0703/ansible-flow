package repository

import "go.uber.org/fx"

var Module = fx.Module(
	"repository",
	fx.Provide(
		NewAuthRepository,
		NewEdgeRepository,
		NewFlowRepository,
		NewNodeRepository,
		NewOAuthRepository,
		NewProjectRepository,
		NewUserRepository,
	),
)
