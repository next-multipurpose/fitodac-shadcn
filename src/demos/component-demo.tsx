import { getTranslations } from "next-intl/server"

import type { DemoEntry } from "@/demos/types"
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

export async function ComponentDemos({ demos }: ComponentDemosProps) {
  if (demos.length === 0) {
    const t = await getTranslations("Demos")
    return (
      <section className="rounded-xl border border-dashed border-border bg-muted/30 p-6">
        <h2 className="text-lg font-medium">{t("heading")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("empty")}</p>
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
