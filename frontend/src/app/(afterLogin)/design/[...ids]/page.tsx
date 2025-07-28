type DesignPageProps = {
  params: { ids: string[] }
}

export default function DesignPage({ params }: Readonly<DesignPageProps>) {
  const { ids } = params

  console.log(ids)

  return (
    <div>
      <h1>Design</h1>
    </div>
  )
}
