import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { ChartsCatalog } from "@/components/charts-catalog"
import { getCharts } from "@/lib/chart-catalog"

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("Metadata")
	return { title: t("chartsTitle") }
}

export default async function ChartsPage() {
	const t = await getTranslations("Charts")
	const charts = getCharts()
	const labels = {
		noCharts: t("noCharts"),
		noChartsDescription: t("noChartsDescription"),
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
					{t("summary", { count: charts.length })}
				</p>
			</div>

			<ChartsCatalog charts={charts} labels={labels} />
		</main>
	)
}
