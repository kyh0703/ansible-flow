import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import type { PropsWithChildren } from 'react'
import { LeftSidebar } from '../_components/left-sidebar'
import Provider from './provider'

type DesignLayoutProps = {
  params: Promise<{ ids: string[] }>
} & PropsWithChildren

export default async function DesignLayout({
  children,
  params,
}: Readonly<DesignLayoutProps>) {
  const { ids } = await params
  const [projectId, flowId] = ids

  if (!projectId || !flowId) {
    throw new Error('Invalid project or flow id')
  }

  return (
    <Provider
      projectId={projectId}
      flowId={flowId}
      yjsUrl={process.env.YJS_BASE_URL ?? ''}
    >
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={15} maxSize={30}>
          <LeftSidebar />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={85}>
          <div className="flex h-full w-full">{children}</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Provider>
  )
}
