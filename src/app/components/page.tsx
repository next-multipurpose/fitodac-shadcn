import type { Metadata } from "next"
import Link from "next/link"

import registry from "../../../registry.json"

export const metadata: Metadata = {
  title: "Componentes",
}

export default function ComponentsPage() {
  const items = [...registry.items].sort((left, right) =>
    left.name.localeCompare(right.name)
  )

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-14">
      <div className="mb-10 flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Catálogo</p>
        <h1 className="text-4xl font-semibold tracking-tight">Componentes</h1>
        <p className="max-w-2xl text-muted-foreground">
          {items.length} entradas disponibles con sus dependencias y archivos
          declarados en el registry.
        </p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.name}>
            <Link
              className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/30"
              href={`/components/${item.name}`}
            >
              <div>
                <h2 className="font-medium">{item.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.type}
                </p>
              </div>
              <div className="mt-auto flex gap-4 text-xs text-muted-foreground">
                <span>{item.files?.length ?? 0} archivos</span>
                <span>{item.dependencies?.length ?? 0} paquetes</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
