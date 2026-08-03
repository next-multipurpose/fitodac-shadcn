import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import { ComponentDemos } from "@/demos/component-demo"
import { getChart, getCharts } from "@/lib/chart-catalog"

type PageProps = {
	params: Promise<{ slug: string }>
}

export function generateStaticParams() {
	return getCharts().map((chart) => ({ slug: chart.name }))
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params
	const chart = getChart(slug)
	const t = await getTranslations("Metadata")

	return {
		title: chart?.title ?? t("chartFallbackTitle"),
	}
}

export default async function ChartDetailPage({ params }: PageProps) {
	const { slug } = await params
	const chart = getChart(slug)

	if (!chart) {
		notFound()
	}

	const t = await getTranslations("Charts")

	return (
		<main className="mx-auto w-full max-w-6xl px-6 py-14">
			<Link
				className="text-sm text-muted-foreground transition-colors hover:text-foreground"
				href="/charts"
			>
				← {t("backToCatalog")}
			</Link>

			<div className="mt-8 flex flex-col gap-3">
				<h1 className="text-4xl font-semibold tracking-tight">{chart.title}</h1>
			</div>

			<div className="mt-10">
				<ComponentDemos demos={[chart]} />
			</div>
		</main>
	)
}
