import type { DemoEntry } from "../src/demos/types"

export function validateComponentRegistry(options: {
  slug: string
  demos: DemoEntry[]
  projectRoot?: string
}): Promise<DemoEntry[]>

export function validateRegistryResolution(options: {
  registries: Record<string, DemoEntry[]>
  resolve: (slug: string) => DemoEntry[]
}): string[]
