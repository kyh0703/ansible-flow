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
  type OnConnect,
  type OnNodesDelete,
} from '@xyflow/react'
import { useTheme } from 'next-themes'
import { useCallback, useRef, type DragEventHandler } from 'react'
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

type FlowProps = {
  initialNodes: AppNode[]
  initialEdges: AppEdge[]
}

export default function DrawingFlow({
  initialNodes,
  initialEdges,
}: Readonly<FlowProps>) {
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

  const { mutateAsync: addNodesMutate } = useAddNodes()
  const { mutateAsync: updateNodesMutate } = useUpdateNodes()
  const { mutateAsync: updateEdgesMutate } = useUpdateEdges()
  const { mutateAsync: addEdgesMutate } = useAddEdges()

  const handleDragOver: DragEventHandler<HTMLDivElement> = useCallback((e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }, [])

  const handleDrop: DragEventHandler<HTMLDivElement> = async (e) => {
    logger.debug('onDrop')
    e.preventDefault()

    const nodeType = e.dataTransfer.getData('application/xyflow')
    if (!nodeType) return

    const position = screenToFlowPosition({
      x: e.clientX,
      y: e.clientY,
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

  return (
    <div className="flow box-border h-full w-full overflow-hidden">
      <ReactFlow
        ref={flowRef}
        proOptions={proOptions}
        colorMode={theme as ColorMode}
        nodes={nodes}
        edges={edges}
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
        {process.env.NODE_ENV === 'development' && <DevTools />}
      </ReactFlow>
    </div>
  )
}
