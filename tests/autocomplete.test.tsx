import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import {
  Autocomplete,
  AutocompleteInput,
} from "@/registry/components/autocomplete"

function renderInput(size?: "sm" | "default" | "lg") {
  render(
    <Autocomplete items={[]}>
      <AutocompleteInput aria-label="Search" size={size} />
    </Autocomplete>
  )

  return screen.getByRole("combobox", { name: "Search" })
}

describe("AutocompleteInput visual contract", () => {
  it.each([
    ["sm", "h-8"],
    ["default", "h-9"],
    ["lg", "h-10"],
  ] as const)("uses the %s control height", (size, heightClass) => {
    expect(renderInput(size)).toHaveClass(heightClass, "rounded-md", "text-sm")
  })

  it("uses the standard form-control interaction vocabulary", () => {
    expect(renderInput()).toHaveClass(
      "border-input",
      "focus-visible:border-ring",
      "focus-visible:ring-3",
      "focus-visible:ring-ring/50",
      "disabled:pointer-events-none",
      "disabled:opacity-50",
      "aria-invalid:border-destructive"
    )
  })
})
