import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import { blockCategories, blockEntries } from "@/lib/blocks-catalog"
import { blockDemos } from "@/demos/blocks/catalog"
import { getBlockBundle } from "@/demos/blocks/get-block-bundle"
import type { DemoIntegrationBundle } from "@/demos/integration/types"
import { BlocksDetail } from "@/components/blocks-detail"

type PageProps = {
	params: Promise<{ slug: string }>
}

export function generateStaticParams() {
	return blockCategories.map((category) => ({ slug: category.slug }))
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params
	const t = await getTranslations("Metadata")
	const category = blockCategories.find((c) => c.slug === slug)
	return {
		title: category ? `${category.slug} blocks` : t("blocksTitle"),
	}
}

export default async function BlocksCategoryPage({ params }: PageProps) {
	const { slug } = await params
	const category = blockCategories.find((c) => c.slug === slug)

	if (!category) {
		notFound()
	}

	const blocks = blockEntries[category.slug] ?? []
	const t = await getTranslations("Blocks")

	const blockBundles: Record<string, DemoIntegrationBundle> = {}

	for (const block of blocks) {
		const demo = blockDemos[block.slug]
		if (!demo) continue
		blockBundles[block.slug] = await getBlockBundle(block.slug, demo)
	}

	return (
		<main className="mx-auto w-full max-w-6xl px-6 py-14">
			<Link
				className="text-sm text-muted-foreground transition-colors hover:text-foreground"
				href="/blocks"
			>
				&larr; {t("backToCategories")}
			</Link>

			<div className="mt-8 flex flex-col gap-3">
				<h1 className="text-4xl font-semibold tracking-tight">
					{t(`categories.${category.slug}`)}
				</h1>
				<p className="max-w-2xl text-muted-foreground">
					{t(`categoryDescriptions.${category.slug}`)}
				</p>
			</div>

			<div className="mt-10">
				<BlocksDetail
					blocks={blocks}
					blockDemos={blockDemos}
					bundles={blockBundles}
				/>
			</div>
		</main>
	)
}
