import { access, readFile, readdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const GENERATED_WARNING = "// GENERATED FILE. DO NOT EDIT."
const VALID_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function slugToExportName(slug) {
  if (!VALID_SLUG.test(slug)) {
    throw new Error(
      `Unsupported demo slug "${slug}". Use lowercase kebab-case directory names.`
    )
  }

  return `${slug.replace(/-([a-z0-9])/g, (_, character) => character.toUpperCase())}Demos`
}

export async function discoverDemoRegistries(demoRoot) {
  let entries

  try {
    entries = await readdir(demoRoot, { withFileTypes: true })
  } catch (error) {
    throw new Error(`Cannot read demo root "${demoRoot}": ${error.message}`)
  }

  const registries = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    const registryPath = path.join(demoRoot, entry.name, "registry.ts")

    try {
      await access(registryPath)
    } catch {
      continue
    }

    const exportName = slugToExportName(entry.name)
    let source

    try {
      source = await readFile(registryPath, "utf8")
    } catch (error) {
      throw new Error(
        `Cannot read demo registry "${registryPath}": ${error.message}`
      )
    }

    const exportPattern = new RegExp(
      `\\bexport\\s+(?:const|let|var|function|class)\\s+${exportName}\\b|\\bexport\\s*\\{[^}]*\\b${exportName}\\b[^}]*\\}`,
      "m"
    )

    if (!exportPattern.test(source)) {
      throw new Error(
        `Demo registry "${registryPath}" must export named value "${exportName}".`
      )
    }

    registries.push({ slug: entry.name, exportName })
  }

  return registries.sort((left, right) =>
    left.slug.localeCompare(right.slug, "en")
  )
}

export function buildGeneratedRegistry(registries) {
  const sorted = [...registries].sort((left, right) =>
    left.slug.localeCompare(right.slug, "en")
  )
  const slugs = new Set()

  for (const registry of sorted) {
    if (slugs.has(registry.slug)) {
      throw new Error(`Duplicate demo slug "${registry.slug}".`)
    }
    slugs.add(registry.slug)
  }

  const imports = sorted
    .map(
      ({ slug, exportName }) =>
        `import { ${exportName} } from "./${slug}/registry"`
    )
    .join("\n")
  const mappings = sorted
    .map(({ slug, exportName }) => {
      const key = slug.includes("-") ? `"${slug}"` : slug
      return `  ${key}: ${exportName},`
    })
    .join("\n")

  return `${GENERATED_WARNING}\n\nimport type { DemoEntry } from "./types"\n\n${imports}\n\nexport const demoRegistry: Record<string, DemoEntry[]> = {\n${mappings}\n}\n`
}

export function validateGeneratedRegistry(registries, source) {
  const expected = buildGeneratedRegistry(registries)
  const imports = [
    ...source.matchAll(/^import \{ (\w+) \} from "\.\/([^/]+)\/registry"$/gm),
  ].map((match) => ({ exportName: match[1], slug: match[2] }))
  const mappings = [
    ...source.matchAll(/^  (?:"([^"]+)"|([a-z0-9-]+)): (\w+),$/gm),
  ].map((match) => ({ slug: match[1] ?? match[2], exportName: match[3] }))
  const expectedBySlug = new Map(
    registries.map((registry) => [registry.slug, registry.exportName])
  )

  for (const collection of [imports, mappings]) {
    const seen = new Set()

    for (const entry of collection) {
      if (seen.has(entry.slug)) {
        throw new Error(
          `Generated demo slug "${entry.slug}" appears more than once.`
        )
      }
      seen.add(entry.slug)

      if (!expectedBySlug.has(entry.slug)) {
        throw new Error(`Stale generated demo slug "${entry.slug}".`)
      }

      if (expectedBySlug.get(entry.slug) !== entry.exportName) {
        throw new Error(
          `Incorrect generated registry mapping for "${entry.slug}".`
        )
      }
    }
  }

  for (const registry of registries) {
    if (!imports.some((entry) => entry.slug === registry.slug)) {
      throw new Error(`Missing generated import for "${registry.slug}".`)
    }
    if (!mappings.some((entry) => entry.slug === registry.slug)) {
      throw new Error(`Missing generated mapping for "${registry.slug}".`)
    }
  }

  if (source !== expected) {
    throw new Error(
      "Generated demo registry output is stale or non-deterministic. Run: pnpm demos:registry"
    )
  }
}

async function run() {
  const check = process.argv.slice(2).includes("--check")
  const unexpectedArguments = process.argv
    .slice(2)
    .filter((argument) => argument !== "--check")

  if (unexpectedArguments.length > 0) {
    throw new Error(`Unsupported argument: ${unexpectedArguments[0]}`)
  }

  const projectRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    ".."
  )
  const demoRoot = path.join(projectRoot, "src", "demos")
  const outputPath = path.join(demoRoot, "registry.generated.ts")
  const registries = await discoverDemoRegistries(demoRoot)
  const expected = buildGeneratedRegistry(registries)
  let current

  try {
    current = await readFile(outputPath, "utf8")
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw new Error(
        `Cannot read generated registry "${outputPath}": ${error.message}`
      )
    }
  }

  if (current === expected) {
    validateGeneratedRegistry(registries, current)
    return
  }

  if (check) {
    throw new Error(
      "Generated demo registry is missing or stale. Run: pnpm demos:registry"
    )
  }

  try {
    await writeFile(outputPath, expected)
  } catch (error) {
    throw new Error(
      `Cannot write generated registry "${outputPath}": ${error.message}`
    )
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  run().catch((error) => {
    console.error(`Demo registry generation failed: ${error.message}`)
    process.exitCode = 1
  })
}
