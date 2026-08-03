import { describe, expect, it } from "vitest"

import { generateStaticParams } from "@/app/charts/[slug]/page"
import { getChart, getCharts } from "@/lib/chart-catalog"

describe("charts route contract", () => {
	it("generates static params from registered chart names", () => {
		const charts = getCharts()

		expect(generateStaticParams()).toEqual(
			charts.map((chart) => ({ slug: chart.name }))
		)
	})

	it("resolves each registered chart name and 404s unknown slugs", () => {
		for (const chart of getCharts()) {
			expect(getChart(chart.name)).toBe(chart)
		}

		expect(getChart("not-a-chart")).toBeUndefined()
		expect(getChart("")).toBeUndefined()
	})
})
