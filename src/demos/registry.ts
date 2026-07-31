import { demoRegistry } from "./registry.generated"

export function getDemosForComponent(slug: string) {
  return demoRegistry[slug] ?? []
}

export type { DemoEntry } from "./types"
