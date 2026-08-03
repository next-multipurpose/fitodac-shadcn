import { describe, expect, it } from "vitest"

import en from "../../messages/en.json"
import es from "../../messages/es.json"

function messageKeys(messages: Record<string, unknown>, prefix = ""): string[] {
	return Object.entries(messages).flatMap(([key, value]) => {
		const path = prefix ? `${prefix}.${key}` : key
		return typeof value === "object" && value !== null
			? messageKeys(value as Record<string, unknown>, path)
			: path
	})
}

describe("message catalogs", () => {
	it("keeps Spanish keys in parity with canonical English messages", () => {
		expect(messageKeys(es).sort()).toEqual(messageKeys(en).sort())
	})

	it("defines the canonical English site labels", () => {
		expect(en.Home.heading).toBe("Components ready for your applications.")
		expect(en.Catalog.heading).toBe("Components")
		expect(en.Demos.heading).toBe("Examples")
	})

	it("defines representative Spanish translations", () => {
		expect(es.Header.components).toBe("Componentes")
		expect(es.Catalog.heading).toBe("Componentes")
		expect(es.Demos.heading).toBe("Ejemplos")
	})

	it("defines canonical English Charts labels and metadata titles", () => {
		expect(en.Header.charts).toBe("Charts")
		expect(en.Metadata.chartsTitle).toBe("Charts")
		expect(en.Metadata.chartFallbackTitle).toBe("Chart")
		expect(en.Charts.heading).toBe("Charts")
		expect(en.Charts.noCharts).toBe("No charts available yet")
		expect(en.Charts.backToCatalog).toBe("Back to charts")
	})

	it("defines representative Spanish Charts translations", () => {
		expect(es.Header.charts).toBe("Gráficos")
		expect(es.Metadata.chartsTitle).toBe("Gráficos")
		expect(es.Metadata.chartFallbackTitle).toBe("Gráfico")
		expect(es.Charts.heading).toBe("Gráficos")
		expect(es.Charts.backToCatalog).toBe("Volver a gráficos")
	})
})
