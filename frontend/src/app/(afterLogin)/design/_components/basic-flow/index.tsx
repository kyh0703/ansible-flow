'use client'

import { cn } from '@/lib'
import logger from '@/lib/logger'
import { useAddNodes, useUpdateEdges, useUpdateNodes } from '@/services/flows'
import { useCursor } from '@/stores/flow-store'
import {
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
} from '@xyflow/react'
import { useTheme } from 'next-themes'
import { useRef, type DragEventHandler } from 'react'
import { useYjs } from '../../_contexts/yjs-context'
import {
  useCursorStateSynced,
  useEdgesStateSynced,
  useNodeOperations,
  useNodesStateSynced,
} from '../../_hooks'
import { getCursorClass } from '../../_utils'
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

export default function BasicFlow({
  initialNodes,
  initialEdges,
}: Readonly<FlowProps>) {
  const { projectId, flowId } = useYjs()

  const flowRef = useRef<HTMLDivElement>(null)

  const { theme } = useTheme()
  const cursorMode = useCursor()

  const { screenToFlowPosition } = useReactFlow<AppNode, AppEdge>()
  const { nodeFactory } = useNodeOperations()

  const [nodes, setNodes, onNodesChange, horizontalLine, verticalLine] =
    useNodesStateSynced(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesStateSynced(initialEdges)
  const [cursors, onMouseMove] = useCursorStateSynced()

  const { mutateAsync: addNodesMutate } = useAddNodes()
  const { mutateAsync: updateNodesMutate } = useUpdateNodes()
  const { mutateAsync: updateEdgesMutate } = useUpdateEdges()

  const handleDrop: DragEventHandler<HTMLDivElement> = async (e) => {
    logger.debug('onDrop', e)
    e.preventDefault()

    const reactData = e.dataTransfer.getData('application/xyflow')
    if (reactData.length === 0) return

    const nodeType = reactData as CustomNodeType
    const position = screenToFlowPosition({
      x: e.clientX,
      y: e.clientY,
    })

    const newNode = nodeFactory(position, nodeType)

    try {
      await addNodesMutate({
        projectId,
        flowId,
        nodes: [newNode],
      })
    } catch (error) {
      logger.error(error)
    }
  }

  return (
    <div
      className={cn(
        'flow box-border h-full w-full overflow-hidden',
        getCursorClass(cursorMode),
      )}
    >
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
