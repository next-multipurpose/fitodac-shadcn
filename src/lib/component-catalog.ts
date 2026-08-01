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

type RegistryItem = {
	name: string
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
			"combobox",
			"date-picker",
			"date-selector",
			"field",
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
		items: [
			"card",
			"chart",
			"data-table",
			"event-calendar",
			"map",
			"table",
			"timeline",
		],
	},
	{
		key: "feedback",
		items: ["alert", "empty", "progress", "skeleton", "sonner", "spinner"],
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
	{ key: "advanced", items: ["tiptap-editor"] },
	{
		key: "utilities",
		items: ["use-character-limit", "use-file-upload", "use-mobile", "use-pagination", "utils"],
	},
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

function slugToDisplayName(slug: string): string {
	return slug
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ")
}

export function prepareCatalogEntries(
	items: readonly RegistryItem[]
): CatalogEntry[] {
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

	const itemsByName = new Map(items.map((item) => [item.name, item]))
	const unknownNames = [...categoryByName.keys()].filter(
		(name) => !itemsByName.has(name)
	)
	if (unknownNames.length > 0) {
		throw new Error(
			`Unknown catalog component entries: ${unknownNames.join(", ")}`
		)
	}

	const uncategorizedNames = items
		.filter(({ name }) => !categoryByName.has(name))
		.map(({ name }) => name)
	if (uncategorizedNames.length > 0) {
		throw new Error(
			`Uncategorized catalog component entries: ${uncategorizedNames.join(", ")}`
		)
	}

	return items
		.map((item) => ({
			name: item.name,
			displayName: slugToDisplayName(item.name),
			type: item.type,
			filesCount: item.files?.length ?? 0,
			packagesCount: item.dependencies?.length ?? 0,
			category: categoryByName.get(item.name)!,
			href: `/components/${item.name}`,
		}))
		.sort((left, right) => left.name.localeCompare(right.name))
}
