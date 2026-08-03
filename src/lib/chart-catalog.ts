import type { DemoEntry } from "@/demos/types"
import { getDemosForComponent } from "@/demos/registry"

export function getCharts(): DemoEntry[] {
  return getDemosForComponent("charts")
}

export function getChart(name: string): DemoEntry | undefined {
  return getCharts().find((demo) => demo.name === name)
}
