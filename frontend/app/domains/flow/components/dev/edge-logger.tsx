import { useEdges } from '@xyflow/react'

export default function EdgeLogger() {
  const edges = useEdges()

  return (
    <div className="react-flow__devtools-Edgechangelogger absolute top-10 right-0 text-xs">
      <div className="react-flow__devtools-title">🏷️Edge Logger🏷️</div>
      <div>총개수: {edges.length}</div>
      <div>
        {edges.map((edge) => (
          <div key={edge.id}>
            {edge.source} → {edge.target}
          </div>
        ))}
      </div>
    </div>
  )
}
