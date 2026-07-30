import "server-only"

import { readFile } from "node:fs/promises"
import path from "node:path"

import type { DemoEntry } from "@/demos/registry"
import registryJson from "../../../registry.json"

import type { DemoIntegrationBundle, IntegrationFile } from "./types"

type RegistryFile = {
  path: string
  type: string
  target?: string
}

type RegistryItem = {
  name: string
  type: string
  files?: RegistryFile[]
  dependencies?: string[]
  registryDependencies?: string[]
}

const registry = registryJson as { items: RegistryItem[] }
const repositoryRoot = process.cwd()
const trustedSourceRoot = path.join(repositoryRoot, "src")

function resolveTrustedSource(sourcePath: string) {
  const absolutePath = path.resolve(repositoryRoot, sourcePath)

  if (
    absolutePath !== trustedSourceRoot &&
    !absolutePath.startsWith(`${trustedSourceRoot}${path.sep}`)
  ) {
    throw new Error(`Untrusted registry source path: ${sourcePath}`)
  }

  return absolutePath
}

function suggestedTargetPath(file: RegistryFile) {
  if (file.target) {
    return file.target.replace(/^src\//, "")
  }

  const filename = path.basename(file.path)

  if (file.type === "registry:lib") {
    return `lib/${filename}`
  }

  if (file.type === "registry:hook") {
    return `hooks/${filename}`
  }

  return `components/ui/${filename}`
}

function toConsumerUsage(source: string, component: string) {
  return source
    .replaceAll(
      `@/registry/primitives/${component}`,
      `@/components/ui/${component}`
    )
    .replaceAll("@/registry/", "@/components/ui/")
    .replaceAll("@/demos/", "@/components/")
}

export async function getIntegrationBundle(
  demo: DemoEntry
): Promise<DemoIntegrationBundle> {
  const rootItem = registry.items.find(
    (item) => item.name === demo.componentSlug
  )

  if (!rootItem) {
    throw new Error(`Registry item not found: ${demo.componentSlug}`)
  }

  const resolvedNames: string[] = []
  const resolvedFiles: IntegrationFile[] = []
  const dependencies: string[] = []
  const seenItems = new Set<string>()
  const seenFiles = new Set<string>()
  const seenDependencies = new Set<string>()

  async function visit(item: RegistryItem) {
    if (seenItems.has(item.name)) return

    seenItems.add(item.name)
    resolvedNames.push(item.name)

    for (const dependency of item.dependencies ?? []) {
      if (!seenDependencies.has(dependency)) {
        seenDependencies.add(dependency)
        dependencies.push(dependency)
      }
    }

    for (const file of item.files ?? []) {
      if (seenFiles.has(file.path)) continue

      seenFiles.add(file.path)
      resolvedFiles.push({
        sourcePath: file.path,
        suggestedTargetPath: suggestedTargetPath(file),
        code: await readFile(resolveTrustedSource(file.path), "utf8"),
      })
    }

    for (const dependencyName of item.registryDependencies ?? []) {
      const dependencyItem = registry.items.find(
        (candidate) => candidate.name === dependencyName
      )

      if (!dependencyItem) {
        throw new Error(`Registry dependency not found: ${dependencyName}`)
      }

      await visit(dependencyItem)
    }
  }

  await visit(rootItem)

  const usageSource = await readFile(
    resolveTrustedSource(demo.sourcePath),
    "utf8"
  )

  return {
    component: demo.componentSlug,
    demo: demo.name,
    usageCode: toConsumerUsage(usageSource, demo.componentSlug),
    files: resolvedFiles,
    dependencies,
    registryDependencies: resolvedNames.slice(1),
  }
}
