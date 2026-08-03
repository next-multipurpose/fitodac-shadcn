import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import registry from "../registry.json"
import {
	componentCategories,
	filterCatalogEntries,
	hiddenCatalogEntries,
	prepareCatalogEntries,
} from "@/lib/component-catalog"
import {
	ComponentsCatalog,
	type ComponentsCatalogLabels,
} from "@/components/components-catalog"

const labels: ComponentsCatalogLabels = {
	allCategories: "All categories",
	categoryFilter: "Filter by category",
	clearSearch: "Clear search",
	gridView: "Grid view",
	listView: "List view",
	noComponentsFound: "No components found",
	resetFilters: "Reset filters",
	searchComponents: "Search components",
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
	it("uses unique category keys and assigns every visible registry item exactly once", () => {
		const keys = componentCategories.map(({ key }) => key)
		const names = componentCategories.flatMap(({ items }) => items)
		const hiddenNames = new Set<string>(hiddenCatalogEntries)
		const visibleRegistrySlugs = registry.items
			.map(({ slug }) => slug)
			.filter((slug) => !hiddenNames.has(slug))

		expect(new Set(keys).size).toBe(keys.length)
		expect(new Set(names).size).toBe(names.length)
		expect([...names].sort()).toEqual(visibleRegistrySlugs.sort())
		expect(entries).toHaveLength(visibleRegistrySlugs.length)
	})

	it("keeps hidden registry components off the catalog page", () => {
		expect(registry.items.some(({ slug }) => slug === "craft-button")).toBe(true)
		expect(registry.items.some(({ slug }) => slug === "ripple-button")).toBe(true)
		expect(registry.items.some(({ slug }) => slug === "kbd")).toBe(true)
		expect(registry.items.some(({ slug }) => slug === "toggle-group")).toBe(true)
		expect(registry.items.some(({ slug }) => slug === "date-selector")).toBe(true)
		expect(registry.items.some(({ slug }) => slug === "field")).toBe(true)
		expect(registry.items.some(({ slug }) => slug === "sidebar")).toBe(true)
		expect(registry.items.some(({ slug }) => slug === "dialog")).toBe(true)
		expect(registry.items.some(({ slug }) => slug === "chart")).toBe(true)
		expect(registry.items.some(({ slug }) => slug === "sonner")).toBe(true)
	})

  	it("rejects configured names that do not resolve to registry items", () => {
  		expect(() =>
  			prepareCatalogEntries(
  				registry.items.filter(({ slug }) => slug !== "button")
  			)
  		).toThrow(/button/)
  	})

  	it("lists mini-calendar as a visible component under forms", () => {
  		const formsCategory = componentCategories.find(
  			(category) => category.key === "forms"
  		)
  		expect(formsCategory?.items).toContain("mini-calendar")

  		const miniCalendarEntry = entries.find(
  			(entry) => entry.name === "mini-calendar"
  		)
  		expect(miniCalendarEntry).toBeDefined()
  		expect(miniCalendarEntry?.category).toBe("forms")
  		expect(miniCalendarEntry?.href).toBe("/components/mini-calendar")
  	})
})

describe("filterCatalogEntries", () => {
	const controlledEntries = [
		{
			name: "button",
			displayName: "Button",
			type: "registry:ui",
			category: "primitives" as const,
			href: "/components/button",
			filesCount: 1,
			packagesCount: 0,
			demoTitles: ["Button primary"],
		},
		{
			name: "dialog",
			displayName: "Dialog",
			type: "button",
			category: "overlays" as const,
			href: "/components/dialog",
			filesCount: 1,
			packagesCount: 0,
			dependencies: ["button"],
			registryDependencies: ["button"],
		},
		{
			name: "button-group",
			displayName: "Button Group",
			type: "registry:ui",
			category: "primitives" as const,
			href: "/components/button-group",
			filesCount: 2,
			packagesCount: 0,
			demoTitles: ["Primary", "Secondary"],
		},
	]

  	it("matches only trimmed, case-insensitive component-name substrings", () => {
  		expect(
  			filterCatalogEntries(controlledEntries, "all", "  BUTTON ").map(
  				({ name }) => name
  			)
  		).toEqual(["button", "button-group"])
  		expect(filterCatalogEntries(controlledEntries, "all", "primary")).toEqual(
  			[]
  		)
  		expect(
  			filterCatalogEntries(controlledEntries, "all", "registry:ui")
  		).toEqual([])
  	})

  	it("matches the mini-calendar component slug without demo-level titles", () => {
  		const matches = filterCatalogEntries(entries, "all", "mini-calendar")
  		expect(matches.map(({ name }) => name)).toEqual(["mini-calendar"])
  	})

	it("intersects category and name filters without duplicating entries", () => {
		expect(
			filterCatalogEntries(controlledEntries, "primitives", "button").map(
				({ name }) => name
			)
		).toEqual(["button", "button-group"])
		expect(
			filterCatalogEntries(controlledEntries, "overlays", "button")
		).toEqual([])
		expect(filterCatalogEntries(controlledEntries, "forms", "   ")).toEqual([])
		expect(filterCatalogEntries(controlledEntries, "all", "   ")).toEqual(
			controlledEntries
		)
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
		const gridNames = within(formsRegion)
			.getAllByRole("link")
			.map((link) => link.querySelector("h3")?.textContent)

		await user.click(screen.getByRole("button", { name: "List view" }))

		expect(filter).toHaveValue("forms")
		expect(screen.getByRole("button", { name: "List view" })).toHaveAttribute(
			"aria-pressed",
			"true"
		)
		const listNames = within(formsRegion)
			.getAllByRole("link")
			.map((link) => link.querySelector("h3")?.textContent)
		expect(listNames).toEqual(gridNames)
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

	it("filters by name while preserving category and view state", async () => {
		const user = userEvent.setup()
		render(<ComponentsCatalog entries={entries} labels={labels} />)
		const search = screen.getByRole("searchbox", { name: "Search components" })
		const filter = screen.getByRole("combobox", { name: "Filter by category" })

		await user.type(search, "BUTTON")
		expect(screen.getAllByRole("link")).toHaveLength(2)
		expect(
			screen.queryByRole("link", { name: /^dialog/i })
		).not.toBeInTheDocument()

		await user.selectOptions(filter, "primitives")
		await user.click(screen.getByRole("button", { name: "List view" }))

		expect(search).toHaveValue("BUTTON")
		expect(filter).toHaveValue("primitives")
		expect(screen.getAllByRole("link")).toHaveLength(2)
		expect(screen.getByRole("button", { name: "List view" })).toHaveAttribute(
			"aria-pressed",
			"true"
		)
	})

	it("shows one empty state and supports clearing or resetting filters", async () => {
		const user = userEvent.setup()
		render(<ComponentsCatalog entries={entries} labels={labels} />)
		const search = screen.getByRole("searchbox", { name: "Search components" })
		const filter = screen.getByRole("combobox", { name: "Filter by category" })

		await user.selectOptions(filter, "forms")
		await user.type(search, "dialog")

		expect(screen.getByText("No components found")).toBeInTheDocument()
		expect(screen.queryByRole("region")).not.toBeInTheDocument()

		await user.click(screen.getByRole("button", { name: "Clear search" }))
		expect(search).toHaveValue("")
		expect(filter).toHaveValue("forms")
		expect(screen.getByRole("region", { name: /Forms/ })).toBeInTheDocument()

		await user.type(search, "no-such-component")
		await user.click(screen.getByRole("button", { name: "Reset filters" }))
		expect(search).toHaveValue("")
		expect(filter).toHaveValue("all")
		expect(screen.getAllByRole("region")).toHaveLength(
			componentCategories.length
		)
	})
})
