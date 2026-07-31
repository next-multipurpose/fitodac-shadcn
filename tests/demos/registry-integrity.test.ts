import { readFile } from "node:fs/promises"
import path from "node:path"
import { describe, expect, it } from "vitest"

import {
  buildGeneratedRegistry,
  discoverDemoRegistries,
  validateGeneratedRegistry,
} from "../../scripts/generate-demo-registry.mjs"
import {
  validateComponentRegistry,
  validateRegistryResolution,
} from "../../scripts/validate-demo-registries.mjs"
import { demoRegistry } from "@/demos/registry.generated"
import { getDemosForComponent } from "@/demos/registry"

const projectRoot = process.cwd()
const demoRoot = path.join(projectRoot, "src", "demos")

describe("demo registry integrity", () => {
  it("validates every discovered component registry and its real source files", async () => {
    const discovered = await discoverDemoRegistries(demoRoot)

    expect(discovered.map(({ slug }) => slug)).toEqual(
      Object.keys(demoRegistry).sort((left, right) =>
        left.localeCompare(right, "en")
      )
    )

    await Promise.all(
      discovered.map(({ slug }) =>
        validateComponentRegistry({
          slug,
          demos: demoRegistry[slug],
          projectRoot,
        })
      )
    )
  })

  it("matches the exact deterministic generated index", async () => {
    const discovered = await discoverDemoRegistries(demoRoot)
    const source = await readFile(
      path.join(demoRoot, "registry.generated.ts"),
      "utf8"
    )

    expect(source).toBe(buildGeneratedRegistry(discovered))
    expect(() => validateGeneratedRegistry(discovered, source)).not.toThrow()
  })

  it("keeps global composition generated and independent from registry.json", async () => {
    const [wrapperSource, generatorSource] = await Promise.all([
      readFile(path.join(demoRoot, "registry.ts"), "utf8"),
      readFile(
        path.join(projectRoot, "scripts", "generate-demo-registry.mjs"),
        "utf8"
      ),
    ])

    expect(wrapperSource).toContain('from "./registry.generated"')
    expect(wrapperSource).not.toMatch(/from "\.\/[a-z0-9-]+\/registry"/)
    expect(generatorSource).not.toContain("registry.json")
  })

  it("proves the public wrapper resolves every exact registry array once", () => {
    expect(
      validateRegistryResolution({
        registries: demoRegistry,
        resolve: getDemosForComponent,
      })
    ).toEqual(Object.keys(demoRegistry).sort())

    const allDemos = Object.values(demoRegistry).flat()
    expect(new Set(allDemos).size).toBe(allDemos.length)
    expect(getDemosForComponent("unknown-component")).toEqual([])
  })

  it("rejects invalid registry metadata with group and demo context", async () => {
    await expect(
      validateComponentRegistry({
        slug: "avatar",
        demos: [
          {
            name: "profile-popover",
            title: "",
            component: () => null,
            componentSlug: "avatar",
            sourcePath: "src/demos/avatar/profile-popover.tsx",
          },
        ],
        projectRoot,
      })
    ).rejects.toThrow(
      "avatar/profile-popover: title must be a non-empty string"
    )
  })

  it("rejects nonexistent and cross-group demo sources", async () => {
    const baseDemo = {
      name: "missing",
      title: "Missing",
      component: () => null,
      componentSlug: "avatar",
      sourcePath: "src/demos/avatar/missing.tsx",
    }

    await expect(
      validateComponentRegistry({
        slug: "avatar",
        demos: [baseDemo],
        projectRoot,
      })
    ).rejects.toThrow("avatar/missing: sourcePath does not exist")

    await expect(
      validateComponentRegistry({
        slug: "avatar",
        demos: [{ ...baseDemo, sourcePath: "src/demos/button/default.tsx" }],
        projectRoot,
      })
    ).rejects.toThrow("sourcePath must belong to its demo group folder")
  })

  it("detects a broken getDemosForComponent mapping", () => {
    expect(() =>
      validateRegistryResolution({
        registries: demoRegistry,
        resolve: (slug: string) =>
          slug === "avatar" ? [] : getDemosForComponent(slug),
      })
    ).toThrow(
      "avatar: getDemosForComponent() returned a different registry array"
    )
  })
})
