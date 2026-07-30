import type { ReactNode } from "react"

export function DetailSection({
  children,
  title,
}: {
  children: ReactNode
  title: string
}) {
  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-4 text-lg font-medium">{title}</h2>
      {children}
    </section>
  )
}

export function TagList({
  emptyLabel,
  items,
}: {
  emptyLabel: string
  items: string[]
}) {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">{emptyLabel}</p>
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          className="rounded-md bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground"
          key={item}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}
