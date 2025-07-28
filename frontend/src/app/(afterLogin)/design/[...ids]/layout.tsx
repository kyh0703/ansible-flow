import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import type { PropsWithChildren } from 'react'
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
    <Provider projectId={projectId} flowId={flowId}>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <div>sidebar</div>
        </ResizablePanel>
        <ResizablePanel>
          <div className="flex h-full w-full">{children}</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Provider>
  )
}
