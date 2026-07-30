import type { DemoEntry } from "@/demos/registry"

type ComponentDemoProps = {
  demo: DemoEntry
}

export function ComponentDemo({ demo }: ComponentDemoProps) {
  const Demo = demo.component

  return (
    <section
      aria-labelledby={`demo-${demo.name}`}
      className="overflow-hidden rounded-xl border border-border bg-card"
    >
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-lg font-medium" id={`demo-${demo.name}`}>
          {demo.title}
        </h2>
      </div>
      <div className="flex min-h-48 items-center justify-center p-6 sm:p-10">
        <Demo />
      </div>
    </section>
  )
}

type ComponentDemosProps = {
  demos: DemoEntry[]
}

export function ComponentDemos({ demos }: ComponentDemosProps) {
  if (demos.length === 0) {
    return (
      <section className="rounded-xl border border-dashed border-border bg-muted/30 p-6">
        <h2 className="text-lg font-medium">Ejemplos</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Todavía no hay ejemplos disponibles para este componente.
        </p>
      </section>
    )
  }

  return (
    <div className="grid gap-6">
      {demos.map((demo) => (
        <ComponentDemo demo={demo} key={demo.name} />
      ))}
    </div>
  )
}
