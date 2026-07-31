import { access } from "node:fs/promises"
import path from "node:path"

const VALID_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function requireNonEmptyString(value, context, field) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${context}: ${field} must be a non-empty string`)
  }
}

function validateDependencies(value, context, field) {
  if (value === undefined) return
  if (!Array.isArray(value)) {
    throw new Error(`${context}: ${field} must be an array`)
  }
  value.forEach((dependency, index) =>
    requireNonEmptyString(dependency, context, `${field}[${index}]`)
  )
}

export async function validateComponentRegistry({
  slug,
  demos,
  projectRoot = process.cwd(),
}) {
  if (!VALID_SLUG.test(slug)) {
    throw new Error(`${slug}: registry slug must be lowercase kebab-case`)
  }
  if (!Array.isArray(demos)) {
    throw new Error(`${slug}: registry export must be an array`)
  }

  const names = new Set()
  const groupRoot = path.resolve(projectRoot, "src", "demos", slug)
  const demosRoot = path.resolve(projectRoot, "src", "demos")

  for (const [index, demo] of demos.entries()) {
    const fallbackContext = `${slug}/entry-${index}`
    if (!demo || typeof demo !== "object") {
      throw new Error(`${fallbackContext}: demo entry must be an object`)
    }

    requireNonEmptyString(demo.name, fallbackContext, "name")
    const context = `${slug}/${demo.name}`
    requireNonEmptyString(demo.title, context, "title")
    requireNonEmptyString(demo.componentSlug, context, "componentSlug")
    requireNonEmptyString(demo.sourcePath, context, "sourcePath")

    if (
      typeof demo.component !== "function" &&
      (typeof demo.component !== "object" || demo.component === null)
    ) {
      throw new Error(
        `${context}: component must be a React component reference`
      )
    }
    if (names.has(demo.name)) {
      throw new Error(`${context}: demo name is duplicated`)
    }
    names.add(demo.name)

    const sourcePath = path.resolve(projectRoot, demo.sourcePath)
    if (
      sourcePath === demosRoot ||
      !sourcePath.startsWith(`${demosRoot}${path.sep}`)
    ) {
      throw new Error(`${context}: sourcePath must point inside src/demos/`)
    }
    if (
      sourcePath === groupRoot ||
      !sourcePath.startsWith(`${groupRoot}${path.sep}`)
    ) {
      throw new Error(
        `${context}: sourcePath must belong to its demo group folder`
      )
    }

    try {
      await access(sourcePath)
    } catch {
      throw new Error(`${context}: sourcePath does not exist`)
    }

    validateDependencies(demo.dependencies, context, "dependencies")
    validateDependencies(
      demo.registryDependencies,
      context,
      "registryDependencies"
    )
  }

  return demos
}

export function validateRegistryResolution({ registries, resolve }) {
  const expectedSlugs = Object.keys(registries).sort()

  for (const slug of expectedSlugs) {
    if (resolve(slug) !== registries[slug]) {
      throw new Error(
        `${slug}: getDemosForComponent() returned a different registry array`
      )
    }
  }

  if (
    !Array.isArray(resolve("__unknown-demo-group__")) ||
    resolve("__unknown-demo-group__").length !== 0
  ) {
    throw new Error("getDemosForComponent() must return [] for unknown slugs")
  }

  return expectedSlugs
}
