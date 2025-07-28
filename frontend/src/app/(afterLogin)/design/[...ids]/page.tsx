type DesignPageProps = {
  params: Promise<{ ids: string[] }>
}

export default async function DesignPage({
  params,
}: Readonly<DesignPageProps>) {
  const { ids } = await params
  const [projectId, flowId] = ids

  if (!projectId || !flowId) {
    throw new Error('Invalid project or flow id')
  }

  return (
    <div>
      <h1>Design</h1>
    </div>
  )
}
