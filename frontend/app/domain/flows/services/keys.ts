export const flowKey = {
  structure: 'structure' as const,
  nodes: 'nodes' as const,
  edges: 'edges' as const,
  nodeProperty: (nodeId: number) =>
    [flowKey.nodes, nodeId, 'property'] as const,
}
