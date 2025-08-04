'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Panel } from '@xyflow/react'
import {
  useState,
  type Dispatch,
  type HTMLAttributes,
  type ReactNode,
  type SetStateAction,
} from 'react'
import ChangeLogger from './change-logger'
import { EdgeInspector } from './edge-logger'
import { NodeInspector } from './node-inspector'
import ViewportLogger from './viewport-logger'

export default function DevTools() {
  const [nodeInspectorActive, setNodeInspectorActive] = useState(true)
  const [edgeInspectorActive, setEdgeInspectorActive] = useState(true)
  const [changeLoggerActive, setChangeLoggerActive] = useState(true)
  const [viewportLoggerActive, setViewportLoggerActive] = useState(true)

  return (
    <div className="react-flow__devtools text-xxs">
      <Panel position="top-center">
        <DevToolButton
          setActive={setChangeLoggerActive}
          active={changeLoggerActive}
          title="Toggle Change Logger"
        >
          Change Logger
        </DevToolButton>
        <DevToolButton
          setActive={setViewportLoggerActive}
          active={viewportLoggerActive}
          title="Toggle Viewport Logger"
        >
          Viewport Logger
        </DevToolButton>
        <DevToolButton
          setActive={setNodeInspectorActive}
          active={nodeInspectorActive}
          title="Toggle Node Inspector"
        >
          Node Inspector
        </DevToolButton>
        <DevToolButton
          setActive={setEdgeInspectorActive}
          active={edgeInspectorActive}
          title="Toggle Edge Inspector"
        >
          Edge Inspector
        </DevToolButton>
      </Panel>
      {changeLoggerActive && <ChangeLogger />}
      {edgeInspectorActive && <EdgeInspector />}
      {nodeInspectorActive && <NodeInspector />}
      {viewportLoggerActive && <ViewportLogger />}
    </div>
  )
}

function DevToolButton({
  active,
  setActive,
  children,
  ...rest
}: {
  active: boolean
  setActive: Dispatch<SetStateAction<boolean>>
  children: ReactNode
} & HTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      variant="ghost"
      onClick={() => setActive((a) => !a)}
      className={cn(active ? 'active' : '')}
      {...rest}
    >
      {children}
    </Button>
  )
}
