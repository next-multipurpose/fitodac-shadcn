import type { DemoEntry } from "@/demos/registry"
import { DemoCard } from "@/demos/demo-card"
import { DemoViewProvider } from "@/demos/demo-view-provider"
import { getIntegrationBundle } from "@/demos/integration/get-integration-bundle"

type ComponentDemoProps = {
  demo: DemoEntry
}

export async function ComponentDemo({ demo }: ComponentDemoProps) {
  const Demo = demo.component
  const bundle = await getIntegrationBundle(demo)

  return (
    <DemoCard
      bundle={bundle}
      demoId={`demo-${demo.componentSlug}-${demo.name}`}
      title={demo.title}
    >
      <Demo />
    </DemoCard>
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
    <DemoViewProvider>
      <div className="grid gap-6">
        {demos.map((demo) => (
          <ComponentDemo demo={demo} key={demo.name} />
        ))}
      </div>
    </DemoViewProvider>
  )
}
