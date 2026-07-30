import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { DetailSection, TagList } from "@/components/component-detail"
import { ComponentDemos } from "@/demos/component-demo"
import { getDemosForComponent } from "@/demos/registry"
import registry from "../../../../registry.json"

type PageProps = {
  params: Promise<{ slug: string }>
}

function findItem(slug: string) {
  return registry.items.find((item) => item.name === slug)
}

export function generateStaticParams() {
  return registry.items.map((item) => ({ slug: item.name }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const item = findItem(slug)

  return {
    title: item?.name ?? "Componente",
  }
}

export default async function ComponentDetailPage({ params }: PageProps) {
  const { slug } = await params
  const item = findItem(slug)

  if (!item) {
    notFound()
  }

  const demos = getDemosForComponent(slug)

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-14">
      <Link
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        href="/components"
      >
        ← Volver al catálogo
      </Link>

      <div className="mt-8 flex flex-col gap-3">
        <p className="text-sm text-muted-foreground">{item.type}</p>
        <h1 className="text-4xl font-semibold tracking-tight">{item.name}</h1>
      </div>

      <div className="mt-10">
        <ComponentDemos demos={demos} />
      </div>

      <div className="mt-8 grid gap-8">
        <DetailSection title="Archivos">
          <ul className="divide-y divide-border">
            {(item.files ?? []).map((file) => (
              <li
                className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
                key={file.path}
              >
                <code className="text-sm">{file.path}</code>
                <span className="text-xs text-muted-foreground">
                  {file.type}
                </span>
              </li>
            ))}
          </ul>
        </DetailSection>

        <DetailSection title="Dependencias">
          <TagList
            emptyLabel="Este componente no declara paquetes adicionales."
            items={item.dependencies ?? []}
          />
        </DetailSection>

        <DetailSection title="Dependencias del registry">
          <TagList
            emptyLabel="Este componente no depende de otras entradas."
            items={item.registryDependencies ?? []}
          />
        </DetailSection>
      </div>
    </main>
  )
}
