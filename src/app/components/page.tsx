import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import registry from "../../../registry.json"
import { ComponentsCatalog } from "@/components/components-catalog"
import {
	componentCategories,
	prepareCatalogEntries,
} from "@/lib/component-catalog"

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("Metadata")
	return { title: t("catalogTitle") }
}

export default async function ComponentsPage() {
	const t = await getTranslations("Catalog")
	const entries = prepareCatalogEntries(registry.items).map((entry) => ({
		...entry,
		filesLabel: t("files", { count: entry.filesCount }),
		packagesLabel: t("packages", { count: entry.packagesCount }),
	}))
	const categoryLabels = Object.fromEntries(
		componentCategories.map(({ key }) => [key, t(`categories.${key}`)])
	) as Record<(typeof componentCategories)[number]["key"], string>

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
					{t("summary", { count: entries.length })}
				</p>
			</div>

			<ComponentsCatalog
				entries={entries}
				labels={{
					allCategories: t("allCategories"),
					categoryFilter: t("categoryFilter"),
					clearSearch: t("clearSearch"),
					gridView: t("gridView"),
					listView: t("listView"),
					noComponentsFound: t("noComponentsFound"),
					resetFilters: t("resetFilters"),
					searchComponents: t("searchComponents"),
					categories: categoryLabels,
				}}
			/>
		</main>
	)
}
