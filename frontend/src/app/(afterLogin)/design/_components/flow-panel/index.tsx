import BasicFlow from '../basic-flow'

export default function FlowPanel() {
  return (
    <div className="flex h-full w-full bg-blue-100">
      <BasicFlow initialNodes={[]} initialEdges={[]} />
    </div>
  )
}
