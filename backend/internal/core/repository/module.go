package repository

import "go.uber.org/fx"

var Module = fx.Module(
	"repository",
	fx.Provide(
		NewMemoryAuthRepository,
		NewEdgesRepository,
		NewFlowsRepository,
		NewNodesRepository,
		NewMemoryOAuthRepository,
		NewProjectsRepository,
		NewUsersRepository,
	),
)
