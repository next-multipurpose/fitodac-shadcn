import { describe, expect, it } from "vitest"

import { generateIntegrationPrompt } from "@/demos/integration/generate-integration-prompt"
import { getIntegrationBundle } from "@/demos/integration/get-integration-bundle"
import { getDemosForComponent } from "@/demos/registry"

function getDemo(group: string, name: string) {
  const demo = getDemosForComponent(group).find((entry) => entry.name === name)
  if (!demo) throw new Error(`Missing test demo: ${group}/${name}`)
  return demo
}

describe("modular registry integration bundle regression", () => {
  it.each([
    ["button", "default"],
    ["avatar", "icon-fallback"],
    ["autocomplete", "grouped-users"],
    ["avatar", "profile-popover"],
    ["alert-dialog", "fullscreen-product"],
  ])("resolves Code and Copy Prompt for %s/%s", async (group, name) => {
    const demo = getDemo(group, name)
    const bundle = await getIntegrationBundle(demo)
    const prompt = generateIntegrationPrompt(bundle)

    expect(bundle.demo).toBe(demo.name)
    expect(bundle.component).toBe(demo.componentSlug)
    expect(bundle.usageCode.trim()).not.toBe("")
    expect(bundle.files.length).toBeGreaterThan(0)
    expect(prompt).toContain(`Component: ${demo.componentSlug}`)
    expect(prompt).toContain(`Example: ${demo.name}`)
    expect(prompt).toContain(bundle.usageCode.trimEnd())
  })

  it("preserves demo npm dependencies", async () => {
    const demo = getDemo("avatar", "icon-fallback")
    const bundle = await getIntegrationBundle(demo)

    expect(bundle.dependencies).toEqual(
      expect.arrayContaining(demo.dependencies ?? [])
    )
  })

  it("preserves demo registry dependencies", async () => {
    const demo = getDemo("autocomplete", "grouped-users")
    const bundle = await getIntegrationBundle(demo)

    expect(bundle.registryDependencies).toEqual(
      expect.arrayContaining(demo.registryDependencies ?? [])
    )
    expect(
      bundle.files.some((file) => file.sourcePath.includes("avatar"))
    ).toBe(true)
  })

  it("preserves combined npm and registry dependencies", async () => {
    const demo = getDemo("avatar", "profile-popover")
    const bundle = await getIntegrationBundle(demo)

    expect(bundle.dependencies).toEqual(
      expect.arrayContaining(demo.dependencies ?? [])
    )
    expect(bundle.registryDependencies).toEqual(
      expect.arrayContaining(demo.registryDependencies ?? [])
    )
  })

  it("keeps page grouping separate from a different integration root", async () => {
    const demo = getDemo("alert-dialog", "fullscreen-product")
    const bundle = await getIntegrationBundle(demo)

    expect(getDemosForComponent("alert-dialog")).toContain(demo)
    expect(demo.componentSlug).toBe("dialog")
    expect(bundle.component).toBe("dialog")
  })
})
