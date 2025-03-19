export const subFlowKeys = {
  nodes: 'nodes' as const,
  edges: 'edges' as const,
  nodeProperty: (nodeId: number) =>
    [subFlowKeys.nodes, nodeId, 'property'] as const,
}
