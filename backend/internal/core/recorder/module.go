package recorder

import "go.uber.org/fx"

var Module = fx.Module(
	"recorder",
	fx.Provide(
		NewNodeRecorder,
		NewEdgeRecorder,
	),
)
