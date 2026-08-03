import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import type { DemoEntry } from "@/demos/types"
import { ChartsCatalog } from "@/components/charts-catalog"

const labels = {
	noCharts: "No charts available yet",
	noChartsDescription:
		"There are no chart examples registered in the catalog yet.",
}

function makeChart(name: string, title: string): DemoEntry {
	return {
		component: () => null,
		componentSlug: "chart",
		sourcePath: `src/demos/charts/${name}.tsx`,
		name,
		title,
	}
}

describe("ChartsCatalog", () => {
	it("renders a localized empty state when no charts are registered", () => {
		render(<ChartsCatalog charts={[]} labels={labels} />)

		expect(screen.getByText(labels.noCharts)).toBeInTheDocument()
		expect(screen.getByText(labels.noChartsDescription)).toBeInTheDocument()
		expect(screen.queryByRole("link")).not.toBeInTheDocument()
	})

	it("renders a responsive grid of full-card links with title and stable name", () => {
		const charts = [
			makeChart("area", "Area Chart"),
			makeChart("bar", "Bar Chart"),
		]

		render(<ChartsCatalog charts={charts} labels={labels} />)

		const links = screen.getAllByRole("link")
		expect(links).toHaveLength(2)
		expect(links[0]).toHaveAttribute("href", "/charts/area")
		expect(links[1]).toHaveAttribute("href", "/charts/bar")

		expect(
			screen.getByRole("heading", { name: "Area Chart" })
		).toBeInTheDocument()
		expect(
			screen.getByRole("heading", { name: "Bar Chart" })
		).toBeInTheDocument()
		expect(screen.getByText("area")).toBeInTheDocument()
		expect(screen.getByText("bar")).toBeInTheDocument()
	})
})
