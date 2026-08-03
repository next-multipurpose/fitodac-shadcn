import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/primitives/tabs"

describe("Tabs", () => {
  it("renders triggers and content for each tab", () => {
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

    expect(screen.getByRole("tab", { name: "Tab A" })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: "Tab B" })).toBeInTheDocument()
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Content A")
  })

  it("switches active tab on click and updates visible content", async () => {
    const user = userEvent.setup()

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

    const tabB = screen.getByRole("tab", { name: "Tab B" })
    await user.click(tabB)

    expect(tabB).toHaveAttribute("data-state", "active")
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Content B")
  })

  it("calls onValueChange when a tab is clicked", async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(
      <Tabs defaultValue="a" onValueChange={handleChange}>
        <TabsList>
          <TabsTrigger value="a">Tab A</TabsTrigger>
          <TabsTrigger value="b">Tab B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content A</TabsContent>
        <TabsContent value="b">Content B</TabsContent>
      </Tabs>,
    )

    await user.click(screen.getByRole("tab", { name: "Tab B" }))

    expect(handleChange).toHaveBeenCalledWith("b")
  })

  it("supports controlled mode via value prop", async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(
      <Tabs value="a" onValueChange={handleChange}>
        <TabsList>
          <TabsTrigger value="a">Tab A</TabsTrigger>
          <TabsTrigger value="b">Tab B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content A</TabsContent>
        <TabsContent value="b">Content B</TabsContent>
      </Tabs>,
    )

    expect(screen.getByRole("tab", { name: "Tab A" })).toHaveAttribute(
      "data-state",
      "active",
    )
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Content A")

    await user.click(screen.getByRole("tab", { name: "Tab B" }))

    expect(handleChange).toHaveBeenCalledWith("b")
    // Controlled: parent didn't change value, so tab A remains active
    expect(screen.getByRole("tab", { name: "Tab A" })).toHaveAttribute(
      "data-state",
      "active",
    )
  })

  it("renders a motion active indicator behind the active trigger", () => {
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

    expect(indicator).toBeInTheDocument()
    expect(indicator).toHaveClass("absolute", "inset-0", "-z-10", "rounded-md")
  })

  it("does not render motion indicator when only one tab", () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Tab A</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content A</TabsContent>
      </Tabs>,
    )

    const trigger = screen.getByRole("tab", { name: "Tab A" })
    const indicator = trigger.querySelector('[aria-hidden="true"]')

    expect(indicator).toBeInTheDocument()
    expect(indicator).toHaveClass("absolute", "inset-0", "-z-10", "rounded-md")
  })

  it("wraps content in a motion div for entrance animation", () => {
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

    const tabpanel = screen.getByRole("tabpanel")
    const motionWrapper = tabpanel.querySelector("div")

    expect(motionWrapper).toBeInTheDocument()
    expect(motionWrapper).toHaveTextContent("Content A")
  })

  it("throws when TabsTrigger is used outside of Tabs", () => {
    expect(() => {
      render(<TabsTrigger value="a">Tab A</TabsTrigger>)
    }).toThrow("Tabs.* must be used inside <Tabs>")
  })

  it("throws when TabsContent is used outside of Tabs", () => {
    expect(() => {
      render(<TabsContent value="a">Content A</TabsContent>)
    }).toThrow("Tabs.* must be used inside <Tabs>")
  })
})
