type Props = {
  params: { ids: string[] }
}

export default function Page({ params }: Readonly<Props>) {
  const { ids } = params

  console.log(ids)

  return (
    <div>
      <h1>Design</h1>
    </div>
  )
}
