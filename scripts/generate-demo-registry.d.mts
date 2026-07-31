export type DemoRegistryDescriptor = {
  slug: string
  exportName: string
}

export function slugToExportName(slug: string): string
export function discoverDemoRegistries(
  demoRoot: string
): Promise<DemoRegistryDescriptor[]>
export function buildGeneratedRegistry(
  registries: DemoRegistryDescriptor[]
): string
export function validateGeneratedRegistry(
  registries: DemoRegistryDescriptor[],
  source: string
): void
