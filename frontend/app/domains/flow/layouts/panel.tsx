import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../../../shared/ui/resizable'

export default function Panel({ children }: { children: React.ReactNode }) {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={20} maxSize={50}>
        <div>left</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>{children}</ResizablePanel>
    </ResizablePanelGroup>
  )
}
