import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { blockCategories } from "@/lib/blocks-catalog"
import { BlocksCatalog } from "@/components/blocks-catalog"

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("Metadata")
	return { title: t("blocksTitle") }
}

export default async function BlocksPage() {
	const t = await getTranslations("Blocks")

	const categoryLabels: Record<string, string> = {}
	const categoryDescriptions: Record<string, string> = {}
	const categoryCounts: Record<string, string> = {}
	for (const category of blockCategories) {
		categoryLabels[category.slug] = t(`categories.${category.slug}`)
		categoryDescriptions[category.slug] = t(
			`categoryDescriptions.${category.slug}`
		)
		categoryCounts[category.slug] = t("blockCount", {
			count: category.blockCount,
		})
	}

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
					{t("summary", { count: blockCategories.length })}
				</p>
			</div>

			<BlocksCatalog
				categories={blockCategories}
				categoryLabels={categoryLabels}
				categoryDescriptions={categoryDescriptions}
				categoryCounts={categoryCounts}
			/>
		</main>
	)
}
