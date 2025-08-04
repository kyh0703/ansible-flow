import { useInternalNode } from '@xyflow/react'

export function useNodeDimensions(id: string) {
  const node = useInternalNode(id)

  return {
    width: node?.measured?.width ?? 0,
    height: node?.measured?.height ?? 0,
  }
}
