import Link from "next/link"
import { BarChartIcon } from "lucide-react"

import type { DemoEntry } from "@/demos/types"
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/registry/primitives/empty"

export type ChartsCatalogLabels = {
	noCharts: string
	noChartsDescription: string
}

export type ChartsCatalogProps = {
	charts: DemoEntry[]
	labels: ChartsCatalogLabels
}

export function ChartsCatalog({ charts, labels }: ChartsCatalogProps) {
	if (charts.length === 0) {
		return (
			<Empty className="border">
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<BarChartIcon aria-hidden="true" />
					</EmptyMedia>
					<EmptyTitle>{labels.noCharts}</EmptyTitle>
					<EmptyDescription>{labels.noChartsDescription}</EmptyDescription>
				</EmptyHeader>
			</Empty>
		)
	}

	return (
		<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{charts.map((chart) => (
				<li key={chart.name}>
					<Link
						className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/30"
						href={`/charts/${chart.name}`}
					>
						<div>
							<h3 className="font-medium">{chart.title}</h3>
							<p className="text-sm text-muted-foreground">{chart.name}</p>
						</div>
					</Link>
				</li>
			))}
		</ul>
	)
}
