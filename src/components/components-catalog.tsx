"use client"

import { useState } from "react"
import Link from "next/link"
import { Grid2X2Icon, ListIcon } from "lucide-react"

import { Button } from "@/registry/primitives/button"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/registry/primitives/native-select"
import {
  componentCategories,
  type CatalogEntry,
  type ComponentCategoryKey,
} from "@/lib/component-catalog"

export type CatalogView = "grid" | "list"
type CategoryFilter = "all" | ComponentCategoryKey

export type ComponentsCatalogLabels = {
  allCategories: string
  categoryFilter: string
  gridView: string
  listView: string
  categories: Record<ComponentCategoryKey, string>
}

type CatalogDisplayEntry = CatalogEntry & {
  filesLabel: string
  packagesLabel: string
}

type ComponentsCatalogProps = {
  entries: CatalogDisplayEntry[]
  labels: ComponentsCatalogLabels
}

export function ComponentsCatalog({ entries, labels }: ComponentsCatalogProps) {
  const [category, setCategory] = useState<CategoryFilter>("all")
  const [view, setView] = useState<CatalogView>("grid")
  const visibleCategories = componentCategories.filter(
    ({ key }) => category === "all" || key === category
  )

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-card p-3">
        <NativeSelect
          aria-label={labels.categoryFilter}
          className="min-w-52"
          value={category}
          onChange={(event) =>
            setCategory(event.target.value as CategoryFilter)
          }
        >
          <NativeSelectOption value="all">
            {labels.allCategories}
          </NativeSelectOption>
          {componentCategories.map(({ key }) => (
            <NativeSelectOption key={key} value={key}>
              {labels.categories[key]}
            </NativeSelectOption>
          ))}
        </NativeSelect>

        <div className="flex items-center gap-1" role="group">
          <Button
            aria-label={labels.gridView}
            aria-pressed={view === "grid"}
            size="icon"
            type="button"
            variant={view === "grid" ? "secondary" : "ghost"}
            onClick={() => setView("grid")}
          >
            <Grid2X2Icon aria-hidden="true" />
          </Button>
          <Button
            aria-label={labels.listView}
            aria-pressed={view === "list"}
            size="icon"
            type="button"
            variant={view === "list" ? "secondary" : "ghost"}
            onClick={() => setView("list")}
          >
            <ListIcon aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-12">
        {visibleCategories.map(({ key }) => {
          const categoryEntries = entries.filter(
            (entry) => entry.category === key
          )

          if (categoryEntries.length === 0) return null

          return (
            <section key={key} aria-labelledby={`category-${key}`}>
              <div className="mb-5 flex items-baseline gap-3">
                <h2
                  className="text-2xl font-semibold tracking-tight"
                  id={`category-${key}`}
                >
                  {labels.categories[key]}
                </h2>
                <span className="text-sm text-muted-foreground">
                  {categoryEntries.length}
                </span>
              </div>

              <ul
                className={
                  view === "grid"
                    ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                    : "flex flex-col gap-3"
                }
              >
                {categoryEntries.map((entry) => (
                  <li key={entry.name}>
                    <Link
                      className={
                        view === "grid"
                          ? "flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/30"
                          : "grid gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-foreground/30 sm:grid-cols-[minmax(0,1fr)_minmax(8rem,auto)_auto_auto] sm:items-center"
                      }
                      href={entry.href}
                    >
                      <div>
                        <h3 className="font-medium">{entry.name}</h3>
                        {view === "grid" ? (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {entry.type}
                          </p>
                        ) : null}
                      </div>
                      {view === "list" ? (
                        <span className="text-sm text-muted-foreground">
                          {entry.type}
                        </span>
                      ) : null}
                      <div
                        className={
                          view === "grid"
                            ? "mt-auto flex gap-4 text-xs text-muted-foreground"
                            : "flex gap-4 text-xs text-muted-foreground sm:contents"
                        }
                      >
                        <span>{entry.filesLabel}</span>
                        <span>{entry.packagesLabel}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </div>
  )
}
