import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

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
  const t = await getTranslations("Metadata")

  return {
    title: item?.name ?? t("componentFallbackTitle"),
  }
}

export default async function ComponentDetailPage({ params }: PageProps) {
  const { slug } = await params
  const item = findItem(slug)

  if (!item) {
    notFound()
  }

  const demos = getDemosForComponent(slug)
  const t = await getTranslations("ComponentDetail")

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-14">
      <Link
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        href="/components"
      >
        ← {t("backToCatalog")}
      </Link>

      <div className="mt-8 flex flex-col gap-3">
        <h1 className="text-4xl font-semibold tracking-tight">{item.name}</h1>
      </div>

      <div className="mt-10">
        <ComponentDemos demos={demos} />
      </div>

      <div className="mt-8 grid gap-8">
        <DetailSection title={t("files")}>
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

        <DetailSection title={t("dependencies")}>
          <TagList
            emptyLabel={t("noPackages")}
            items={item.dependencies ?? []}
          />
        </DetailSection>

        <DetailSection title={t("registryDependencies")}>
          <TagList
            emptyLabel={t("noRegistryDependencies")}
            items={item.registryDependencies ?? []}
          />
        </DetailSection>
      </div>
    </main>
  )
}
