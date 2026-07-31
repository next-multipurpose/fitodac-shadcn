import type { Metadata } from "next"
import Link from "next/link"
import { getTranslations } from "next-intl/server"

import registry from "../../../registry.json"

const componentCategories = [
  {
    key: "primitives",
    items: [
      "avatar",
      "badge",
      "button",
      "button-group",
      "craft-button",
      "item",
      "kbd",
      "ripple-button",
      "separator",
      "toggle",
      "toggle-group",
    ],
  },
  {
    key: "forms",
    items: [
      "autocomplete",
      "calendar",
      "checkbox",
      "date-selector",
      "field",
      "form",
      "input",
      "input-group",
      "input-otp",
      "input-phone",
      "input-time",
      "label",
      "native-select",
      "radio-group",
      "rating",
      "select",
      "select-native",
      "slider",
      "stepper",
      "switch",
      "textarea",
    ],
  },
  {
    key: "navigation",
    items: [
      "breadcrumb",
      "menubar",
      "navigation-menu",
      "pagination",
      "sidebar",
      "tabs",
    ],
  },
  {
    key: "overlays",
    items: [
      "alert-dialog",
      "command",
      "context-menu",
      "dialog",
      "drawer",
      "dropdown-menu",
      "hover-card",
      "popover",
      "sheet",
      "tooltip",
    ],
  },
  {
    key: "dataDisplay",
    items: ["card", "chart", "event-calendar", "map", "table", "timeline"],
  },
  {
    key: "feedback",
    items: ["alert", "empty", "progress", "skeleton", "sonner", "spinner"],
  },
  {
    key: "layout",
    items: ["accordion", "carousel", "collapsible", "scroll-area", "sortable"],
  },
  {
    key: "advanced",
    items: ["tiptap-editor"],
  },
  {
    key: "utilities",
    items: ["use-character-limit", "use-file-upload", "use-mobile", "utils"],
  },
] as const

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata")
  return { title: t("catalogTitle") }
}

export default async function ComponentsPage() {
  const t = await getTranslations("Catalog")
  const items = [...registry.items].sort((left, right) =>
    left.name.localeCompare(right.name)
  )
  const itemsByName = new Map(items.map((item) => [item.name, item]))

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-14">
      <div className="mb-10 flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">
          {t("eyebrow")}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">
          {t("heading")}
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          {t("summary", { count: items.length })}
        </p>
      </div>

      <div className="flex flex-col gap-12">
        {componentCategories.map((category) => {
          const categoryItems = category.items.flatMap((name) => {
            const item = itemsByName.get(name)
            return item ? [item] : []
          })

          return (
            <section key={category.key} aria-labelledby={category.key}>
              <div className="mb-5 flex items-baseline gap-3">
                <h2
                  className="text-2xl font-semibold tracking-tight"
                  id={category.key}
                >
                  {t(`categories.${category.key}`)}
                </h2>
                <span className="text-sm text-muted-foreground">
                  {categoryItems.length}
                </span>
              </div>

              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categoryItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/30"
                      href={`/components/${item.name}`}
                    >
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.type}
                        </p>
                      </div>
                      <div className="mt-auto flex gap-4 text-xs text-muted-foreground">
                        <span>
                          {t("files", { count: item.files?.length ?? 0 })}
                        </span>
                        <span>
                          {t("packages", {
                            count: item.dependencies?.length ?? 0,
                          })}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </main>
  )
}
