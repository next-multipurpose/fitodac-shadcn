import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import registry from "../registry.json"
import {
  componentCategories,
  prepareCatalogEntries,
} from "@/lib/component-catalog"
import {
  ComponentsCatalog,
  type ComponentsCatalogLabels,
} from "@/components/components-catalog"

const labels: ComponentsCatalogLabels = {
  allCategories: "All categories",
  categoryFilter: "Filter by category",
  gridView: "Grid view",
  listView: "List view",
  categories: {
    primitives: "Primitives",
    forms: "Forms",
    navigation: "Navigation",
    overlays: "Overlays and menus",
    dataDisplay: "Data display",
    feedback: "Feedback",
    layout: "Layout",
    advanced: "Advanced components",
    utilities: "Hooks and utilities",
  },
}

const entries = prepareCatalogEntries(registry.items).map((entry) => ({
  ...entry,
  filesLabel: `${entry.filesCount} files`,
  packagesLabel: `${entry.packagesCount} packages`,
}))

describe("component catalog categories", () => {
  it("uses unique category keys and assigns every registry item exactly once", () => {
    const keys = componentCategories.map(({ key }) => key)
    const names = componentCategories.flatMap(({ items }) => items)

    expect(new Set(keys).size).toBe(keys.length)
    expect(new Set(names).size).toBe(names.length)
    expect([...names].sort()).toEqual(
      registry.items.map(({ name }) => name).sort()
    )
    expect(entries).toHaveLength(registry.items.length)
  })

  it("rejects configured names that do not resolve to registry items", () => {
    expect(() =>
      prepareCatalogEntries(
        registry.items.filter(({ name }) => name !== "button")
      )
    ).toThrow(/button/)
  })
})

describe("ComponentsCatalog", () => {
  it("defaults to all categories in grid view", () => {
    render(<ComponentsCatalog entries={entries} labels={labels} />)

    expect(
      screen.getByRole("combobox", { name: "Filter by category" })
    ).toHaveValue("all")
    expect(screen.getByRole("button", { name: "Grid view" })).toHaveAttribute(
      "aria-pressed",
      "true"
    )
    expect(screen.getByRole("button", { name: "List view" })).toHaveAttribute(
      "aria-pressed",
      "false"
    )
    expect(screen.getAllByRole("region")).toHaveLength(
      componentCategories.length
    )
  })

  it("filters one category at a time and restores all categories", async () => {
    const user = userEvent.setup()
    render(<ComponentsCatalog entries={entries} labels={labels} />)
    const filter = screen.getByRole("combobox", { name: "Filter by category" })

    await user.selectOptions(filter, "forms")
    expect(screen.getAllByRole("region")).toHaveLength(1)
    expect(screen.getByRole("region", { name: /Forms/ })).toBeInTheDocument()

    await user.selectOptions(filter, "overlays")
    expect(screen.getAllByRole("region")).toHaveLength(1)
    expect(
      screen.getByRole("region", { name: /Overlays and menus/ })
    ).toBeInTheDocument()

    await user.selectOptions(filter, "all")
    expect(screen.getAllByRole("region")).toHaveLength(
      componentCategories.length
    )
  })

  it("switches views without changing the category or rendered entries", async () => {
    const user = userEvent.setup()
    render(<ComponentsCatalog entries={entries} labels={labels} />)
    const filter = screen.getByRole("combobox", { name: "Filter by category" })

    await user.selectOptions(filter, "forms")
    const formsRegion = screen.getByRole("region", { name: /Forms/ })
    const gridLinks = within(formsRegion)
      .getAllByRole("link")
      .map((link) => link.textContent)

    await user.click(screen.getByRole("button", { name: "List view" }))

    expect(filter).toHaveValue("forms")
    expect(screen.getByRole("button", { name: "List view" })).toHaveAttribute(
      "aria-pressed",
      "true"
    )
    expect(
      within(formsRegion)
        .getAllByRole("link")
        .map((link) => link.textContent)
    ).toEqual(gridLinks)
    expect(within(formsRegion).getAllByText("1 files").length).toBeGreaterThan(
      0
    )

    await user.click(screen.getByRole("button", { name: "Grid view" }))
    expect(filter).toHaveValue("forms")
    expect(screen.getByRole("button", { name: "Grid view" })).toHaveAttribute(
      "aria-pressed",
      "true"
    )
  })

  it("exposes a native selector and supports keyboard view controls", async () => {
    const user = userEvent.setup()
    render(<ComponentsCatalog entries={entries} labels={labels} />)
    const filter = screen.getByRole("combobox", { name: "Filter by category" })

    expect(filter.tagName).toBe("SELECT")

    const listView = screen.getByRole("button", { name: "List view" })
    listView.focus()
    await user.keyboard("{Enter}")
    expect(listView).toHaveAttribute("aria-pressed", "true")
  })
})
