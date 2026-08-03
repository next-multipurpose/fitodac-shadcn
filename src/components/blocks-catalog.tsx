"use client"

import { ShieldIcon } from "lucide-react"
import Link from "next/link"

import type { BlockCategory } from "@/lib/blocks-catalog"

type BlocksCatalogProps = {
	categories: readonly BlockCategory[]
	categoryLabels: Record<string, string>
	categoryDescriptions: Record<string, string>
	categoryCounts: Record<string, string>
}

const CATEGORY_ICONS: Record<
	string,
	React.ComponentType<{ className?: string }>
> = {
	auth: ShieldIcon,
}

export function BlocksCatalog({
	categories,
	categoryLabels,
	categoryDescriptions,
	categoryCounts,
}: BlocksCatalogProps) {
	return (
		<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{categories.map((category) => {
				const Icon = CATEGORY_ICONS[category.slug] ?? ShieldIcon
				const title = categoryLabels[category.slug] ?? category.slug
				const description =
					categoryDescriptions[category.slug] ?? ""
				return (
					<li key={category.slug}>
						<Link
							className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/30"
							href={`/blocks/${category.slug}`}
						>
							<div className="flex items-center gap-3">
								<Icon
									className="size-5 text-muted-foreground"
									aria-hidden="true"
								/>
								<h3 className="font-medium">{title}</h3>
							</div>
							<p className="text-sm text-muted-foreground">
								{description}
							</p>
							<div className="mt-auto flex gap-4 text-xs text-muted-foreground">
								<span>{categoryCounts[category.slug] ?? ""}</span>
							</div>
						</Link>
					</li>
				)
			})}
		</ul>
	)
}
