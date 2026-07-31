import { mkdtemp, mkdir, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { describe, expect, it } from "vitest"

import {
  buildGeneratedRegistry,
  discoverDemoRegistries,
  slugToExportName,
  validateGeneratedRegistry,
} from "../../scripts/generate-demo-registry.mjs"

async function createFixture(
  registries: Record<string, string>
): Promise<string> {
  const root = await mkdtemp(path.join(tmpdir(), "demo-registry-"))

  await Promise.all(
    Object.entries(registries).map(async ([slug, source]) => {
      const directory = path.join(root, slug)
      await mkdir(directory, { recursive: true })
      await writeFile(path.join(directory, "registry.ts"), source)
    })
  )

  return root
}

describe("demo registry generator", () => {
  it.each([
    ["button", "buttonDemos"],
    ["alert-dialog", "alertDialogDemos"],
    ["date-picker", "datePickerDemos"],
  ])("maps %s to %s", (slug, exportName) => {
    expect(slugToExportName(slug)).toBe(exportName)
  })

  it("rejects unsupported slugs", () => {
    expect(() => slugToExportName("Bad_Slug")).toThrow("Unsupported demo slug")
  })

  it("discovers and generates registries in deterministic slug order", async () => {
    const root = await createFixture({
      button: "export const buttonDemos = []",
      "alert-dialog": "export const alertDialogDemos = []",
      alert: "export const alertDemos = []",
    })

    const registries = await discoverDemoRegistries(root)
    const generated = buildGeneratedRegistry(registries)

    expect(registries.map(({ slug }) => slug)).toEqual([
      "alert",
      "alert-dialog",
      "button",
    ])
    expect(generated).toContain(
      'import { alertDialogDemos } from "./alert-dialog/registry"'
    )
    expect(generated).toContain('  "alert-dialog": alertDialogDemos,')
    expect(buildGeneratedRegistry(registries)).toBe(generated)
    expect(buildGeneratedRegistry([...registries].reverse())).toBe(generated)
    expect(() => validateGeneratedRegistry(registries, generated)).not.toThrow()
  })

  it("rejects duplicate resolved slugs", () => {
    expect(() =>
      buildGeneratedRegistry([
        { slug: "button", exportName: "buttonDemos" },
        { slug: "button", exportName: "buttonDemos" },
      ])
    ).toThrow("Duplicate demo slug")
  })

  it("rejects a registry without its expected export", async () => {
    const root = await createFixture({
      button: "export const incorrectlyNamedDemos = []",
    })

    await expect(discoverDemoRegistries(root)).rejects.toThrow(
      'must export named value "buttonDemos"'
    )
  })

  it("rejects incorrect generated imports and output", () => {
    const registries = [{ slug: "button", exportName: "buttonDemos" }]
    const generated = buildGeneratedRegistry(registries).replace(
      'from "./button/registry"',
      'from "./missing/registry"'
    )

    expect(() => validateGeneratedRegistry(registries, generated)).toThrow(
      'Stale generated demo slug "missing"'
    )
  })

  it("rejects duplicate generated mappings", () => {
    const registries = [{ slug: "button", exportName: "buttonDemos" }]
    const generated = buildGeneratedRegistry(registries).replace(
      "  button: buttonDemos,",
      "  button: buttonDemos,\n  button: buttonDemos,"
    )

    expect(() => validateGeneratedRegistry(registries, generated)).toThrow(
      'Generated demo slug "button" appears more than once'
    )
  })

  it("ignores demo changes inside an existing group", async () => {
    const root = await createFixture({
      button: "export const buttonDemos = []",
    })
    const before = buildGeneratedRegistry(await discoverDemoRegistries(root))

    await writeFile(
      path.join(root, "button", "registry.ts"),
      "export const buttonDemos = [anotherDemo]"
    )

    expect(buildGeneratedRegistry(await discoverDemoRegistries(root))).toBe(
      before
    )
  })

  it("adds exactly one import and mapping for a new group", async () => {
    const root = await createFixture({
      button: "export const buttonDemos = []",
    })
    const before = buildGeneratedRegistry(await discoverDemoRegistries(root))

    await mkdir(path.join(root, "alert"))
    await writeFile(
      path.join(root, "alert", "registry.ts"),
      "export const alertDemos = []"
    )
    const after = buildGeneratedRegistry(await discoverDemoRegistries(root))

    expect(after.split("\n").length - before.split("\n").length).toBe(2)
    expect(after).toContain('import { alertDemos } from "./alert/registry"')
    expect(after).toContain("  alert: alertDemos,")
  })
})
