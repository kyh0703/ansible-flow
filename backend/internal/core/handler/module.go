package handler

import (
	"go.uber.org/fx"
)

var Module = fx.Module(
	"handler",
	fx.Provide(
		AsHandler(NewAuthHandler),
		AsHandler(NewEdgesHandler),
		AsHandler(NewFlowsHandler),
		AsHandler(NewNodesHandler),
		AsHandler(NewOAuthHandler),
		AsHandler(NewProjectsHandler),
		AsHandler(NewUsersHandler),
	),
)
