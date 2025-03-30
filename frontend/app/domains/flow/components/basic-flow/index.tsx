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
import { cn } from '~/shared/lib/utils'
import { useTheme } from '~/shared/providers/theme-provider'
import { useCursorStateSynced } from '../../hooks/use-cursor-state-synced'
import { useEdgesStateSynced } from '../../hooks/use-edges-state-synced'
import { getCursorClassByEditMode } from '../../utils/get-cursor-mode'
import DevTools from '../dev/dev-tool'
import {
  defaultEdgeOptions,
  fitViewOptions,
  proOptions,
  viewPort,
} from './options'
import { HelperLines } from '../tools/helper-line'
import { isValidConnection } from '../tools/validator'
import { useNodesStateSynced } from '../../hooks/use-nodes-state-synced'
import { IconToolbar } from '../toolbar/icon-toolbar'
import { ConnectionLine } from '../tools/connection-line'

import '@xyflow/react/dist/style.css'
import { Cursors } from '../tools/cursor'
import { useFlowStore } from '../../store/flow'

type FlowProps = {
  flowId: number
  initialNodes: AppNode[]
  initialEdges: AppEdge[]
  focusNode?: string
}

export default function BasicFlow({
  flowId,
  initialNodes,
  initialEdges,
  focusNode,
}: FlowProps) {
  const flowRef = useRef<HTMLDivElement>(null)

  const { theme } = useTheme()
  const editMode = useFlowStore((state) => state.editMode)

  const [isInit, setIsInit] = useState(false)
  const [nodes, setNodes, onNodesChange, horizontalLine, verticalLine] =
    useNodesStateSynced(flowId, initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesStateSynced(
    flowId,
    initialEdges,
  )
  const [cursors, onMouseMove] = useCursorStateSynced(flowId)

  const handleInit: OnInit<AppNode, AppEdge> = () => {
    setIsInit(true)
  }

  const handleMinimapNodeClick = useCallback(
    (_: React.MouseEvent<Element, MouseEvent>, node: AppNode) => {
      // TODO: focus node
    },
    [],
  )

  return (
    <div
      id="main"
      tabIndex={0}
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
        onInit={handleInit}
      >
        <Controls />
        <MiniMap<AppNode>
          zoomable
          pannable
          zoomStep={1.2}
          onNodeClick={handleMinimapNodeClick}
        />
        <Cursors cursors={cursors} />
        <HelperLines horizontal={horizontalLine} vertical={verticalLine} />
        <Panel position="top-left">
          <IconToolbar flowId={flowId} />
        </Panel>
        {process.env.NODE_ENV === 'development' && <DevTools />}
      </ReactFlow>
    </div>
  )
}
