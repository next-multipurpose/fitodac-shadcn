import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

vi.mock("motion/react", async (importActual) => {
  const actual = await importActual<typeof import("motion/react")>()
  return {
    ...actual,
    useReducedMotion: () => true,
  }
})

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/primitives/tabs"

describe("Tabs (reduced motion)", () => {
  it("does not render motion indicator when reduced motion is enabled", () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Tab A</TabsTrigger>
          <TabsTrigger value="b">Tab B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content A</TabsContent>
        <TabsContent value="b">Content B</TabsContent>
      </Tabs>,
    )

    const activeTrigger = screen.getByRole("tab", { name: "Tab A" })
    const indicator = activeTrigger.querySelector('[aria-hidden="true"]')

    expect(indicator).not.toBeInTheDocument()
  })

  it("does not render motion content wrapper transition when reduced motion is enabled", () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Tab A</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content A</TabsContent>
      </Tabs>,
    )

    const tabpanel = screen.getByRole("tabpanel")
    const motionWrapper = tabpanel.querySelector("div")

    expect(motionWrapper).toBeInTheDocument()
    expect(motionWrapper).toHaveTextContent("Content A")
  })
})
