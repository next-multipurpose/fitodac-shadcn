import { describe, expect, it } from "vitest"

import { chartsDemos } from "@/demos/charts/registry"
import { getDemosForComponent } from "@/demos/registry"
import { getChart, getCharts } from "@/lib/chart-catalog"
import { validateComponentRegistry } from "../../scripts/validate-demo-registries.mjs"

const projectRoot = process.cwd()
const kebabName = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

describe("charts demo registry", () => {
  it("exposes an empty charts group through the public registry", () => {
    expect(Array.isArray(chartsDemos)).toBe(true)
    expect(getDemosForComponent("charts")).toBe(chartsDemos)
    expect(getCharts()).toBe(chartsDemos)
    expect(getDemosForComponent("charts")).toEqual([])
  })

  it("is integrity-valid as an empty group", async () => {
    await expect(
      validateComponentRegistry({
        slug: "charts",
        demos: chartsDemos,
        projectRoot,
      })
    ).resolves.toBe(chartsDemos)
  })

  it("enforces unique kebab-case names, chart source paths, and componentSlug", () => {
    const names = chartsDemos.map((demo) => demo.name)

    expect(new Set(names).size).toBe(names.length)
    expect(
      chartsDemos.every(
        (demo) =>
          kebabName.test(demo.name) &&
          demo.componentSlug === "chart" &&
          demo.sourcePath === `src/demos/charts/${demo.name}.tsx`
      )
    ).toBe(true)
  })

  it("looks up individual charts by name and returns undefined otherwise", () => {
    for (const demo of chartsDemos) {
      expect(getChart(demo.name)).toBe(demo)
    }

    expect(getChart("nonexistent")).toBeUndefined()
    expect(getChart("")).toBeUndefined()
  })
})
