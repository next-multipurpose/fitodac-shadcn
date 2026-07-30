import Link from "next/link"

import registry from "../../registry.json"

export default function HomePage() {
  const componentCount = registry.items.length
  const dependencyCount = new Set(
    registry.items.flatMap((item) => item.dependencies ?? [])
  ).size

  return (
    <main>
      <section className="border-b border-border/70">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-[1fr_20rem] lg:items-end">
          <div className="flex flex-col items-start gap-6">
            <p className="text-sm font-medium text-muted-foreground">
              @fitodac/shadcn
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl">
              Componentes listos para tus aplicaciones.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Explorá el catálogo, revisá las dependencias de cada entrada y
              encontrá sus archivos fuente.
            </p>
            <Link
              className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              href="/components"
            >
              Ver componentes
            </Link>
          </div>
          <dl className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <dt className="text-sm text-muted-foreground">Entradas</dt>
              <dd className="mt-2 text-3xl font-semibold">{componentCount}</dd>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <dt className="text-sm text-muted-foreground">Dependencias</dt>
              <dd className="mt-2 text-3xl font-semibold">{dependencyCount}</dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
  )
}
