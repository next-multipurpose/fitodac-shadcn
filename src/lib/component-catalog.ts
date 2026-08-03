export type ComponentCategoryKey =
	| "primitives"
	| "forms"
	| "navigation"
	| "overlays"
	| "dataDisplay"
	| "feedback"
	| "layout"
	| "advanced"
	| "utilities"

export type ComponentCategory = {
	key: ComponentCategoryKey
	items: readonly string[]
}

export type CatalogEntry = {
	name: string
	displayName: string
	type: string
	filesCount: number
	packagesCount: number
	category: ComponentCategoryKey
	href: string
}

export type CatalogCategoryFilter = "all" | ComponentCategoryKey

export const hiddenCatalogEntries = ["craft-button", "kbd", "ripple-button", "toggle-group", "date-selector", "mini-calendar", "field", "sidebar", "dialog", "chart", "sonner", "use-character-limit",
			"use-file-upload",
			"use-mobile",
			"use-pagination",
			"utils"] as const

type RegistryItem = {
	name: string
	slug: string
	type: string
	files?: readonly unknown[]
	dependencies?: readonly string[]
}

export const componentCategories: readonly ComponentCategory[] = [
{
			key: "primitives",
			items: [
				"avatar",
				"badge",
				"button",
				"button-group",
				"item",
				"separator",
				"toggle"
			],
		},
	{
		key: "forms",
		items: [
			"autocomplete",
			"calendar",
			"checkbox",
			"combobox",
			"date-picker",
			"file-upload",
			"form",
			"input",
			"input-group",
			"input-numeric",
			"input-otp",
			"input-phone",
			"input-time",
			"label",
			"native-select",
			"radio-group",
			"rating",
			"select",
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
			"tabs",
		],
	},
	{
		key: "overlays",
		items: [
			"alert-dialog",
			"command",
			"context-menu",
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
		items: [
			"card",
			"data-table",
			"event-calendar",
			"map",
			"stats",
			"table",
			"timeline",
		],
	},
	{
		key: "feedback",
		items: [
			"alert",
			"empty",
			"progress",
			"skeleton",
			"spinner",
			"toast",
		],
	},
	{
		key: "layout",
		items: [
			"accordion",
			"carousel",
			"collapsible",
			"drag-and-drop",
			"scroll-area",
			"sortable",
		],
	},
	{ key: "advanced", items: ["tiptap-editor"] }
]

export function filterCatalogEntries<T extends CatalogEntry>(
	entries: readonly T[],
	category: CatalogCategoryFilter,
	query: string
): T[] {
	const normalizedQuery = query.trim().toLowerCase()

	return entries.filter(
		(entry) =>
			(category === "all" || entry.category === category) &&
			(entry.name.toLowerCase().includes(normalizedQuery) ||
				entry.displayName.toLowerCase().includes(normalizedQuery))
	)
}

export function prepareCatalogEntries(
	items: readonly RegistryItem[]
): CatalogEntry[] {
	const hiddenNames = new Set<string>(hiddenCatalogEntries)
	const visibleItems = items.filter(({ slug }) => !hiddenNames.has(slug))
	const categoryByName = new Map<string, ComponentCategoryKey>()
	const categoryKeys = new Set<ComponentCategoryKey>()

	for (const category of componentCategories) {
		if (categoryKeys.has(category.key)) {
			throw new Error(`Duplicate component category key: ${category.key}`)
		}
		categoryKeys.add(category.key)

		for (const name of category.items) {
			if (categoryByName.has(name)) {
				throw new Error(`Component is assigned to multiple categories: ${name}`)
			}
			categoryByName.set(name, category.key)
		}
	}

	const itemsBySlug = new Map(items.map((item) => [item.slug, item]))
	const unknownNames = [...categoryByName.keys()].filter(
		(name) => !itemsBySlug.has(name)
	)
	if (unknownNames.length > 0) {
		throw new Error(
			`Unknown catalog component entries: ${unknownNames.join(", ")}`
		)
	}

	const uncategorizedNames = visibleItems
		.filter(({ slug }) => !categoryByName.has(slug))
		.map(({ slug }) => slug)
	if (uncategorizedNames.length > 0) {
		throw new Error(
			`Uncategorized catalog component entries: ${uncategorizedNames.join(", ")}`
		)
	}

	return visibleItems
		.map((item) => ({
			name: item.slug,
			displayName: item.name,
			type: item.type,
			filesCount: item.files?.length ?? 0,
			packagesCount: item.dependencies?.length ?? 0,
			category: categoryByName.get(item.slug)!,
			href: `/components/${item.slug}`,
		}))
		.sort((left, right) => left.name.localeCompare(right.name))
}
