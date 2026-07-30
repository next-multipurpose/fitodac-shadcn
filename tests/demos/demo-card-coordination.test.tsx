import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { DemoCard } from "@/demos/demo-card"
import { DemoViewProvider } from "@/demos/demo-view-provider"
import type { DemoIntegrationBundle } from "@/demos/integration/types"

const scrollIntoView = vi.fn()

beforeEach(() => {
  scrollIntoView.mockClear()
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
    configurable: true,
    value: scrollIntoView,
  })
})

function createBundle(name: string): DemoIntegrationBundle {
  return {
    component: name,
    demo: name,
    dependencies: [],
    files: [
      {
        code: `export function ${name}() {}`,
        sourcePath: `src/demos/${name}.tsx`,
        suggestedTargetPath: `components/${name}.tsx`,
      },
    ],
    registryDependencies: [],
    usageCode: `<${name} />`,
  }
}

function renderDemoCards() {
  render(
    <DemoViewProvider>
      <DemoCard bundle={createBundle("DemoA")} demoId="demo-a" title="Demo A">
        <p>Rendered preview A</p>
      </DemoCard>
      <DemoCard bundle={createBundle("DemoB")} demoId="demo-b" title="Demo B">
        <p>Rendered preview B</p>
      </DemoCard>
    </DemoViewProvider>
  )

  const cardA = screen
    .getByRole("heading", { name: "Demo A" })
    .closest("section")
  const cardB = screen
    .getByRole("heading", { name: "Demo B" })
    .closest("section")

  if (!cardA || !cardB) {
    throw new Error("Expected both demo cards to render")
  }

  return {
    cardAElement: cardA,
    cardBElement: cardB,
    cardA: within(cardA),
    cardB: within(cardB),
  }
}

describe("DemoCard coordination", () => {
  it("scrolls the opened Code card to the top after its view renders", async () => {
    const user = userEvent.setup()
    const { cardA, cardAElement, cardB } = renderDemoCards()

    expect(cardAElement).toHaveClass("scroll-mt-20")

    await user.click(cardA.getByRole("button", { name: "Code" }))

    await waitFor(() =>
      expect(scrollIntoView).toHaveBeenLastCalledWith({
        behavior: "smooth",
        block: "start",
      })
    )
    expect(scrollIntoView).toHaveBeenCalledTimes(1)

    await user.click(
      cardB.getByRole("button", { name: "Copy Demo B integration prompt" })
    )
    await user.click(cardB.getByRole("button", { name: "Preview" }))

    expect(scrollIntoView).toHaveBeenCalledTimes(1)

    await user.click(cardB.getByRole("button", { name: "Code" }))

    await waitFor(() => expect(scrollIntoView).toHaveBeenCalledTimes(2))
  })

  it("keeps only one Code panel open and restores previews", async () => {
    const user = userEvent.setup()
    const { cardA, cardB } = renderDemoCards()

    expect(cardA.getByText("Rendered preview A")).toBeInTheDocument()
    expect(cardB.getByText("Rendered preview B")).toBeInTheDocument()
    expect(cardA.getByRole("button", { name: "Preview" })).toHaveAttribute(
      "aria-pressed",
      "true"
    )
    expect(cardB.getByRole("button", { name: "Preview" })).toHaveAttribute(
      "aria-pressed",
      "true"
    )

    await user.click(cardA.getByRole("button", { name: "Code" }))

    expect(cardA.getByText("Example usage")).toBeInTheDocument()
    expect(cardB.getByText("Rendered preview B")).toBeInTheDocument()

    await user.click(cardB.getByRole("button", { name: "Code" }))

    expect(cardA.getByText("Rendered preview A")).toBeInTheDocument()
    expect(cardA.queryByText("Example usage")).not.toBeInTheDocument()
    expect(cardB.getByText("Example usage")).toBeInTheDocument()
    expect(cardA.getByRole("button", { name: "Code" })).toHaveAttribute(
      "aria-pressed",
      "false"
    )
    expect(cardB.getByRole("button", { name: "Code" })).toHaveAttribute(
      "aria-pressed",
      "true"
    )

    await user.click(cardB.getByRole("button", { name: "Preview" }))

    expect(cardA.getByText("Rendered preview A")).toBeInTheDocument()
    expect(cardB.getByText("Rendered preview B")).toBeInTheDocument()
  })

  it("does not change the active card through copy controls or a closed Preview", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.spyOn(navigator.clipboard, "writeText").mockImplementation(writeText)
    const user = userEvent.setup()
    const { cardA, cardB } = renderDemoCards()

    await user.click(cardA.getByRole("button", { name: "Code" }))
    await user.click(
      cardB.getByRole("button", { name: "Copy Demo B integration prompt" })
    )
    await user.click(cardB.getByRole("button", { name: "Preview" }))

    expect(cardA.getByText("Example usage")).toBeInTheDocument()
    expect(cardB.getByText("Rendered preview B")).toBeInTheDocument()

    await user.click(
      cardA.getByRole("button", { name: "Copy Demo A example usage" })
    )
    await user.click(
      cardA.getByRole("button", { name: "Copy components/DemoA.tsx" })
    )

    expect(cardA.getByText("Example usage")).toBeInTheDocument()
    expect(cardB.getByText("Rendered preview B")).toBeInTheDocument()
    expect(writeText).toHaveBeenCalledTimes(3)
  })

  it("applies the same single-open behavior to keyboard activation", async () => {
    const user = userEvent.setup()
    const { cardA, cardB } = renderDemoCards()
    const codeA = cardA.getByRole("button", { name: "Code" })
    const codeB = cardB.getByRole("button", { name: "Code" })

    codeA.focus()
    await user.keyboard("{Enter}")

    expect(cardA.getByText("Example usage")).toBeInTheDocument()

    codeB.focus()
    await user.keyboard(" ")

    expect(cardA.getByText("Rendered preview A")).toBeInTheDocument()
    expect(cardB.getByText("Example usage")).toBeInTheDocument()
  })
})
