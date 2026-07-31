import { NextIntlClientProvider } from "next-intl"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { ThemeSelector } from "@/components/theme-selector"
import cobaltRegistry from "@/registry/themes/cobalt/registry.json"
import englishMessages from "../messages/en.json"
import spanishMessages from "../messages/es.json"

function createStorage(): Storage {
  const values = new Map<string, string>()

  return {
    clear: () => values.clear(),
    getItem: (key) => values.get(key) ?? null,
    key: (index) => [...values.keys()][index] ?? null,
    get length() {
      return values.size
    },
    removeItem: (key) => values.delete(key),
    setItem: (key, value) => values.set(key, value),
  }
}

const cobaltTheme = cobaltRegistry.items.find(
  (item) => item.name === "cobalt" && item.type === "registry:theme"
)!

function renderSelector(locale: "en" | "es" = "en") {
  return render(
    <NextIntlClientProvider
      locale={locale}
      messages={locale === "en" ? englishMessages : spanishMessages}
    >
      <ThemeSelector />
    </NextIntlClientProvider>
  )
}

async function selectTheme(theme: "Cobalt" | "Default") {
  const user = userEvent.setup()

  await user.click(screen.getByRole("button", { name: "Select theme" }))
  await user.click(screen.getByRole("menuitemradio", { name: theme }))
}

describe("ThemeSelector", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", createStorage())
    document.documentElement.className = ""
    document.documentElement.removeAttribute("style")
  })

  it.each([
    [null, "Cobalt"],
    ["cobalt", "Cobalt"],
    ["default", "Default"],
    ["invalid", "Cobalt"],
  ])("resolves stored %s as %s", async (storedTheme, label) => {
    if (storedTheme) localStorage.setItem("ui-theme", storedTheme)

    renderSelector()

    expect(
      await screen.findByRole("button", { name: "Select theme" })
    ).toHaveTextContent(label)
  })

  it.each([
    ["light", "default"],
    ["dark", "default"],
    ["light", "cobalt"],
    ["dark", "cobalt"],
  ] as const)(
    "switches to %s mode's %s UI theme without changing color mode",
    async (colorMode, requestedTheme) => {
      const initialTheme = requestedTheme === "cobalt" ? "default" : "cobalt"
      localStorage.setItem("ui-theme", initialTheme)
      localStorage.setItem("theme", colorMode)
      document.documentElement.classList.toggle("dark", colorMode === "dark")
      document.documentElement.style.colorScheme = colorMode

      renderSelector()
      await selectTheme(requestedTheme === "cobalt" ? "Cobalt" : "Default")

      expect(localStorage.getItem("ui-theme")).toBe(requestedTheme)
      expect(localStorage.getItem("theme")).toBe(colorMode)
      expect(document.documentElement.classList.contains("dark")).toBe(
        colorMode === "dark"
      )
      expect(document.documentElement.style.colorScheme).toBe(colorMode)
      expect(document.documentElement.style.getPropertyValue("--primary")).toBe(
        requestedTheme === "cobalt"
          ? cobaltTheme.cssVars[colorMode].primary
          : ""
      )
    }
  )

  it("applies the selection when storage is unavailable", async () => {
    vi.spyOn(localStorage, "setItem").mockImplementation(() => {
      throw new Error("unavailable")
    })
    renderSelector()

    await selectTheme("Default")

    expect(
      screen.getByRole("button", { name: "Select theme" })
    ).toHaveTextContent("Default")
    expect(document.documentElement.style.getPropertyValue("--primary")).toBe(
      ""
    )
  })

  it("exposes the selected choice and supports keyboard selection", async () => {
    const user = userEvent.setup()
    renderSelector()
    const trigger = await screen.findByRole("button", { name: "Select theme" })

    trigger.focus()
    await user.keyboard("{Enter}")
    expect(screen.getByRole("menuitemradio", { name: "Cobalt" })).toBeChecked()

    await user.keyboard("{ArrowDown}{Enter}")

    expect(localStorage.getItem("ui-theme")).toBe("default")
    expect(trigger).toHaveFocus()
  })

  it("uses the Spanish accessible labels", async () => {
    const user = userEvent.setup()
    renderSelector("es")

    const trigger = await screen.findByRole("button", {
      name: "Seleccionar tema",
    })
    expect(trigger).toHaveTextContent("Cobalt")

    await user.click(trigger)
    expect(screen.getByText("Tema")).toBeInTheDocument()
  })
})
