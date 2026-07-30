import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Button } from "@/registry/primitives/button"

describe("Button", () => {
  it("renders children in a native button and forwards native props", async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(
      <Button name="save" type="submit" aria-label="Save changes" onClick={handleClick}>
        Save
      </Button>
    )

    const button = screen.getByRole("button", { name: "Save changes" })

    expect(button).toHaveTextContent("Save")
    expect(button).toHaveAttribute("name", "save")
    expect(button).toHaveAttribute("type", "submit")

    await user.click(button)

    expect(handleClick).toHaveBeenCalledOnce()
  })

  it("preserves native disabled behavior", async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(
      <Button disabled onClick={handleClick}>
        Save
      </Button>
    )

    const button = screen.getByRole("button", { name: "Save" })

    expect(button).toBeDisabled()
    await user.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it.each([
    ["default", "bg-primary", "text-primary-foreground"],
    ["destructive", "bg-destructive", "text-white"],
    ["outline", "border", "bg-background"],
  ] as const)(
    "applies the %s variant semantic styling contract",
    (variant, backgroundClass, foregroundClass) => {
      render(<Button variant={variant}>{variant}</Button>)

      expect(screen.getByRole("button", { name: variant })).toHaveClass(
        backgroundClass,
        foregroundClass
      )
    }
  )

  it.each([
    ["default", "h-9", "px-4"],
    ["xs", "h-6", "text-xs"],
    ["icon-lg", "size-10", "rounded-md"],
  ] as const)("applies the %s size contract", (size, firstClass, secondClass) => {
    render(<Button size={size}>{size}</Button>)

    expect(screen.getByRole("button", { name: size })).toHaveClass(firstClass, secondClass)
  })

  it("composes through asChild without adding a button wrapper", () => {
    render(
      <Button asChild variant="link">
        <a href="/components">Browse components</a>
      </Button>
    )

    const link = screen.getByRole("link", { name: "Browse components" })

    expect(link).toHaveAttribute("href", "/components")
    expect(link).toHaveAttribute("data-slot", "button")
    expect(link).toHaveClass("text-primary", "underline-offset-4")
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })
})
