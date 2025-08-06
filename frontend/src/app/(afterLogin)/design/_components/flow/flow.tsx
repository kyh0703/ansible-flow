'use client'

import logger from '@/lib/logger'
import {
  useAddEdges,
  useAddNodes,
  useUpdateEdges,
  useUpdateNodes,
} from '@/services/flows'
import {
  useCursor,
  useFlowActions,
  useSelectedNodeId,
} from '@/stores/flow-store'
import {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Panel,
  ReactFlow,
  useReactFlow,
  type AppEdge,
  type AppNode,
  type ColorMode,
  type CustomNodeType,
  type NodeMouseHandler,
  type OnConnect,
  type OnNodesDelete,
} from '@xyflow/react'
import { useTheme } from 'next-themes'
import { useCallback, useRef, useState, type DragEventHandler } from 'react'
import { useYjs } from '../../_contexts/yjs-context'
import {
  useCursorStateSynced,
  useEdgeOperations,
  useEdgesStateSynced,
  useNodeOperations,
  useNodesStateSynced,
} from '../../_hooks'
import DevTools from '../dev-tool/dev-tool'
import { IconToolbar } from '../toolbar/icon-toolbar/icon-toolbar'
import { ConnectionLine } from '../tools/connection-line'
import { Cursors } from '../tools/cursor'
import { HelperLines } from '../tools/helper-line'
import { isValidConnection } from '../tools/validator'
import {
  defaultEdgeOptions,
  fitViewOptions,
  proOptions,
  viewPort,
} from './options'

import '@xyflow/react/dist/style.css'
import { edgeTypes } from '../edge'
import { NodeContextMenu, NodeContextMenuProps, nodeTypes } from '../node'

type FlowProps = {
  initialNodes: AppNode[]
  initialEdges: AppEdge[]
}

export function Flow({ initialNodes, initialEdges }: Readonly<FlowProps>) {
  const { projectId, flowId } = useYjs()

  const flowRef = useRef<HTMLDivElement>(null)

  const { screenToFlowPosition } = useReactFlow<AppNode, AppEdge>()

  const cursorMode = useCursor()
  const selectedNodeId = useSelectedNodeId()
  const { setSelectedNodeId } = useFlowActions()

  const { theme } = useTheme()
  const { nodeFactory, getNodeType } = useNodeOperations()
  const { getEdgeBySource, edgeFactory } = useEdgeOperations()

  const [nodes, setNodes, onNodesChange, horizontalLine, verticalLine] =
    useNodesStateSynced(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesStateSynced(initialEdges)
  const [cursors, onMouseMove] = useCursorStateSynced()
  const [nodeContextMenu, setNodeContextMenu] =
    useState<NodeContextMenuProps | null>(null)

  const { mutateAsync: addNodesMutate } = useAddNodes()
  const { mutateAsync: updateNodesMutate } = useUpdateNodes()
  const { mutateAsync: updateEdgesMutate } = useUpdateEdges()
  const { mutateAsync: addEdgesMutate } = useAddEdges()

  const handleDragOver: DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault()
      event.dataTransfer.dropEffect = 'move'
    },
    [],
  )

  const handleDrop: DragEventHandler<HTMLDivElement> = async (event) => {
    logger.debug('onDrop')
    event.preventDefault()

    const nodeType = event.dataTransfer.getData('application/xyflow')
    if (!nodeType) return

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    })

    const newNode = nodeFactory(position, nodeType as CustomNodeType)
    try {
      await addNodesMutate({
        projectId,
        flowId,
        nodes: [newNode],
      })

      setNodes((nodes) => [...nodes, newNode])
    } catch (error) {
      logger.error(error)
    }
  }

  const handleNodesDelete: OnNodesDelete<AppNode> = useCallback(
    (deleteNodes) => {
      if (deleteNodes.some((node) => node.id === selectedNodeId)) {
        setSelectedNodeId(null)
      }
    },
    [selectedNodeId, setSelectedNodeId],
  )

  const handleConnect: OnConnect = useCallback(
    async (connection) => {
      logger.debug('onConnect', connection)

      const edgeType = getNodeType(connection.source)
      if (!edgeType) return

      try {
        const oldEdge = getEdgeBySource(connection.source)
        if (oldEdge) {
        } else {
          const newEdge = edgeFactory(connection, edgeType, 'next')
          if (!newEdge) return
          await addEdgesMutate({
            projectId,
            flowId,
            edges: [newEdge],
          })
          setEdges((edges) => addEdge(newEdge, edges))
        }
      } catch (error) {
        logger.error(error)
      }
    },
    [updateEdgesMutate],
  )

  const handleNodeContextMenu: NodeMouseHandler<AppNode> = useCallback(
    (event, node) => {
      event.preventDefault()
      event.stopPropagation()

      setNodeContextMenu({
        id: node.id,
        mouse: {
          x: event.clientX,
          y: event.clientY,
        },
      })
    },
    [],
  )

  return (
    <div className="flow box-border h-full w-full overflow-hidden">
      <ReactFlow
        ref={flowRef}
        proOptions={proOptions}
        colorMode={theme as ColorMode}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        minZoom={0.1}
        maxZoom={3}
        fitView={!viewPort}
        fitViewOptions={fitViewOptions}
        defaultViewport={viewPort}
        deleteKeyCode={null}
        disableKeyboardA11y={true}
        selectNodesOnDrag={false}
        connectionLineComponent={ConnectionLine}
        zoomOnDoubleClick={false}
        defaultEdgeOptions={defaultEdgeOptions}
        isValidConnection={isValidConnection}
        onMouseMove={onMouseMove}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onNodesDelete={handleNodesDelete}
        onNodeContextMenu={handleNodeContextMenu}
        onConnect={handleConnect}
      >
        <Background variant={BackgroundVariant.Dots} />
        <Controls />
        <MiniMap<AppNode> zoomable pannable zoomStep={1.2} />
        <Cursors cursors={cursors} />
        <HelperLines horizontal={horizontalLine} vertical={verticalLine} />
        <Panel position="bottom-center">
          <IconToolbar />
        </Panel>
        {nodeContextMenu && <NodeContextMenu {...nodeContextMenu} />}
        {process.env.NODE_ENV === 'development' && <DevTools />}
      </ReactFlow>
    </div>
  )
}
