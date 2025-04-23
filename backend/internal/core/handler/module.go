package handler

import (
	"go.uber.org/fx"
)

var Module = fx.Module(
	"handler",
	fx.Provide(
		AsHandler(NewAuthHandler),
		AsHandler(NewEdgeHandler),
		AsHandler(NewFlowHandler),
		AsHandler(NewNodeHandler),
		AsHandler(NewOAuthHandler),
		AsHandler(NewProjectHandler),
		AsHandler(NewUserHandler),
	),
)
