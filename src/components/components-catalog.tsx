"use client"

import { useState } from "react"
import Link from "next/link"
import { Grid2X2Icon, ListIcon, SearchIcon, XIcon } from "lucide-react"

import { Button } from "@/registry/primitives/button"
import {
	Empty,
	EmptyContent,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/registry/primitives/empty"
import { Input } from "@/registry/primitives/input"
import {
	NativeSelect,
	NativeSelectOption,
} from "@/registry/primitives/native-select"
import {
	componentCategories,
	filterCatalogEntries,
	type CatalogEntry,
	type CatalogCategoryFilter,
	type ComponentCategoryKey,
} from "@/lib/component-catalog"

export type CatalogView = "grid" | "list"

export type ComponentsCatalogLabels = {
	allCategories: string
	categoryFilter: string
	clearSearch: string
	gridView: string
	listView: string
	noComponentsFound: string
	resetFilters: string
	searchComponents: string
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
	const [category, setCategory] = useState<CatalogCategoryFilter>("all")
	const [query, setQuery] = useState("")
	const [view, setView] = useState<CatalogView>("grid")
	const visibleEntries = filterCatalogEntries(entries, category, query)
	const visibleCategories = componentCategories.filter(({ key }) =>
		visibleEntries.some((entry) => entry.category === key)
	)

	function resetFilters() {
		setCategory("all")
		setQuery("")
	}

	return (
		<div className="flex flex-col gap-10">
			<div className="flex flex-col gap-3 rounded-xl border bg-card p-3 sm:flex-row sm:items-center">
				<div className="relative min-w-0 flex-1">
					<SearchIcon
						aria-hidden="true"
						className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
					/>
					<Input
						aria-label={labels.searchComponents}
						className="pr-10 pl-9"
						placeholder={labels.searchComponents}
						type="search"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
					/>
					{query.length > 0 ? (
						<Button
							aria-label={labels.clearSearch}
							className="absolute top-1/2 right-0.5 -translate-y-1/2"
							size="icon-sm"
							type="button"
							variant="ghost"
							onClick={() => setQuery("")}
						>
							<XIcon aria-hidden="true" />
						</Button>
					) : null}
				</div>

				<div className="flex items-center justify-between gap-3">
					<NativeSelect
						aria-label={labels.categoryFilter}
						className="min-w-0 sm:min-w-52"
						value={category}
						onChange={(event) =>
							setCategory(event.target.value as CatalogCategoryFilter)
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
			</div>

			<div className="flex flex-col gap-12">
				{visibleEntries.length === 0 ? (
					<Empty className="border">
						<EmptyHeader>
							<EmptyMedia variant="icon">
								<SearchIcon aria-hidden="true" />
							</EmptyMedia>
							<EmptyTitle>{labels.noComponentsFound}</EmptyTitle>
						</EmptyHeader>
						{category !== "all" ? (
							<EmptyContent>
								<Button type="button" onClick={resetFilters}>
									{labels.resetFilters}
								</Button>
							</EmptyContent>
						) : null}
					</Empty>
				) : null}
				{visibleCategories.map(({ key }) => {
					const categoryEntries = visibleEntries.filter(
						(entry) => entry.category === key
					)

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
												<h3 className="font-medium">{entry.displayName}</h3>
												
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
