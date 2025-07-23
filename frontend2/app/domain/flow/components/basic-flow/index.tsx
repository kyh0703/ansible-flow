import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Panel,
  ReactFlow,
  type AppEdge,
  type AppNode,
  type ColorMode,
  type OnInit,
} from '@xyflow/react'
import { useCallback, useRef, useState } from 'react'
import { useCursorStateSynced } from '../../hooks/use-cursor-state-synced'
import { useEdgesStateSynced } from '../../hooks/use-edges-state-synced'
import { useNodesStateSynced } from '../../hooks/use-nodes-state-synced'
import { getCursorClassByEditMode } from '../../utils/get-cursor-mode'
import DevTools from '../dev/dev-tool'
import { IconToolbar } from '../toolbar/icon-toolbar'
import { ConnectionLine } from '../tools/connection-line'
import { HelperLines } from '../tools/helper-line'
import { isValidConnection } from '../tools/validator'
import {
  defaultEdgeOptions,
  fitViewOptions,
  proOptions,
  viewPort,
} from './options'

import { cn } from '@/shared/lib/cn'
import { useTheme } from '@/shared/providers/theme-provider'
import '@xyflow/react/dist/style.css'
import { useEditMode } from '../../store/flow'
import { Cursors } from '../tools/cursor'

type FlowProps = {
  flowId: number
  initialNodes: AppNode[]
  initialEdges: AppEdge[]
}

export default function BasicFlow({
  flowId,
  initialNodes,
  initialEdges,
}: Readonly<FlowProps>) {
  const flowRef = useRef<HTMLDivElement>(null)

  const { theme } = useTheme()
  const editMode = useEditMode()

  const [nodes, setNodes, onNodesChange, horizontalLine, verticalLine] =
    useNodesStateSynced(flowId, initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesStateSynced(
    flowId,
    initialEdges,
  )
  const [cursors, onMouseMove] = useCursorStateSynced(flowId)

  const handleMinimapNodeClick = useCallback(
    (_: React.MouseEvent<Element, MouseEvent>, node: AppNode) => {
      // TODO: focus node
      console.log('node', node)
    },
    [],
  )

  return (
    <div
      id="main"
      className={cn(
        'flow box-border h-full w-full overflow-hidden',
        getCursorClassByEditMode(editMode),
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
      >
        <Background variant={BackgroundVariant.Dots} />
        <Controls />
        <MiniMap<AppNode>
          zoomable
          pannable
          zoomStep={1.2}
          onNodeClick={handleMinimapNodeClick}
        />
        <Cursors cursors={cursors} />
        <HelperLines horizontal={horizontalLine} vertical={verticalLine} />
        <Panel position="top-right">
          <IconToolbar flowId={flowId} />
        </Panel>
        {process.env.NODE_ENV === 'development' && <DevTools />}
      </ReactFlow>
    </div>
  )
}
