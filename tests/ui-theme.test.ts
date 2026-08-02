import { beforeEach, describe, expect, it, vi } from "vitest"

import cobaltRegistry from "@/registry/themes/cobalt/registry.json"
import {
  applyUITheme,
  COBALT_THEME,
  COBALT_THEME_CSS,
  COBALT_THEME_CSS_TEXT,
  DEFAULT_UI_THEME,
  getInitialUITheme,
  getStoredUITheme,
  initializeUIThemeSynchronization,
  isUITheme,
  persistUITheme,
  reapplyUITheme,
  resolveUITheme,
  UI_THEME_BOOTSTRAP_SCRIPT,
  UI_THEME_STORAGE_KEY,
} from "@/lib/ui-theme"
import { applyTheme } from "@/lib/theme"

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
const cobaltPropertyNames = new Set(
  Object.keys({
    ...cobaltTheme.cssVars.theme,
    ...cobaltTheme.cssVars.light,
    ...cobaltTheme.cssVars.dark,
  }).map((key) => `--${key}`)
)

function runUIThemeBootstrap() {
  Function(UI_THEME_BOOTSTRAP_SCRIPT)()
}

describe("UI theme runtime", () => {
  it("sources the Cobalt focus contract from its installable registry item", () => {
    expect(COBALT_THEME_CSS).toEqual(cobaltTheme.css)
    expect(COBALT_THEME_CSS_TEXT).toContain(
      ':root[data-ui-theme="cobalt"]'
    )
    expect(COBALT_THEME_CSS_TEXT).toContain("border-color: var(--ring);")
    expect(COBALT_THEME_CSS_TEXT).toContain(
      "box-shadow: var(--shadow-xs) !important;"
    )
  })

  beforeEach(() => {
    vi.stubGlobal("localStorage", createStorage())
    document.documentElement.removeAttribute("style")
    document.documentElement.removeAttribute("data-ui-theme")
    document.documentElement.className = ""
  })

  it.each([
    ["cobalt", true],
    ["default", true],
    ["light", false],
    [null, false],
  ])("validates %s as %s", (value, expected) => {
    expect(isUITheme(value)).toBe(expected)
  })

  it.each([
    [null, "cobalt"],
    ["invalid", "cobalt"],
    ["cobalt", "cobalt"],
    ["default", "default"],
  ] as const)("resolves %s as %s", (storedTheme, expected) => {
    expect(resolveUITheme(storedTheme)).toBe(expected)
  })

  it("defaults safely when storage is missing or unavailable", () => {
    expect(DEFAULT_UI_THEME).toBe("cobalt")
    expect(getStoredUITheme()).toBeNull()
    expect(getInitialUITheme()).toBe("cobalt")

    vi.stubGlobal("localStorage", {
      getItem: () => {
        throw new Error("unavailable")
      },
    })

    expect(getStoredUITheme()).toBeNull()
    expect(getInitialUITheme()).toBe("cobalt")
  })

  it("resolves a persisted Default selection", () => {
    localStorage.setItem(UI_THEME_STORAGE_KEY, "default")

    expect(getStoredUITheme()).toBe("default")
    expect(getInitialUITheme()).toBe("default")
  })

  it.each(["light", "dark"] as const)(
    "applies canonical Cobalt common and %s variables",
    (colorMode) => {
      applyUITheme("cobalt", colorMode)

      expect(
        document.documentElement.style.getPropertyValue("--font-sans")
      ).toBe(cobaltTheme.cssVars.theme["font-sans"])
      expect(
        document.documentElement.style.getPropertyValue("--radius-md")
      ).toBe(cobaltTheme.cssVars.theme["radius-md"])
      expect(
        document.documentElement.style.getPropertyValue("--shadow-sm")
      ).toBe(cobaltTheme.cssVars.theme["shadow-sm"])
      expect(document.documentElement.style.getPropertyValue("--primary")).toBe(
        cobaltTheme.cssVars[colorMode].primary
      )
      expect(document.documentElement.style.getPropertyValue("--surface")).toBe(
        cobaltTheme.cssVars[colorMode].surface
      )
      expect(document.documentElement.style.getPropertyValue("--border")).toBe(
        cobaltTheme.cssVars[colorMode].border
      )
      expect(document.documentElement).toHaveAttribute(
        "data-ui-theme",
        "cobalt"
      )
    }
  )

  it.each([
    [null, "light", "cobalt"],
    [null, "dark", "cobalt"],
    ["cobalt", "light", "cobalt"],
    ["cobalt", "dark", "cobalt"],
    ["default", "light", "default"],
    ["default", "dark", "default"],
    ["invalid", "light", "cobalt"],
  ] as const)(
    "bootstraps stored %s in %s mode as %s before hydration",
    (storedTheme, colorMode, expectedTheme) => {
      if (storedTheme) {
        localStorage.setItem(UI_THEME_STORAGE_KEY, storedTheme)
      }
      document.documentElement.classList.toggle("dark", colorMode === "dark")

      runUIThemeBootstrap()

      expect(document.documentElement.classList.contains("dark")).toBe(
        colorMode === "dark"
      )
      expect(document.documentElement.style.getPropertyValue("--primary")).toBe(
        expectedTheme === "cobalt" ? cobaltTheme.cssVars[colorMode].primary : ""
      )
      expect(document.documentElement).toHaveAttribute(
        "data-ui-theme",
        expectedTheme
      )
    }
  )

  it("serializes the canonical Cobalt runtime definition into the bootstrap", () => {
    expect(COBALT_THEME).toBe(cobaltTheme.cssVars)
    expect(UI_THEME_BOOTSTRAP_SCRIPT).toContain(JSON.stringify(COBALT_THEME))
  })

  it("removes every Cobalt property without touching unrelated or color-mode state", () => {
    document.documentElement.classList.add("dark")
    document.documentElement.style.colorScheme = "dark"
    document.documentElement.style.setProperty("--unrelated", "kept")
    localStorage.setItem("theme", "dark")
    applyUITheme("cobalt", "dark")

    applyUITheme("default", "light")

    for (const propertyName of cobaltPropertyNames) {
      expect(
        document.documentElement.style.getPropertyValue(propertyName)
      ).toBe("")
    }
    expect(document.documentElement.style.getPropertyValue("--unrelated")).toBe(
      "kept"
    )
    expect(document.documentElement).toHaveClass("dark")
    expect(document.documentElement.style.colorScheme).toBe("dark")
    expect(localStorage.getItem("theme")).toBe("dark")
    expect(document.documentElement).toHaveAttribute(
      "data-ui-theme",
      "default"
    )
  })

  it("reapplies the current selection for a changed color mode", () => {
    applyUITheme("cobalt", "light")
    reapplyUITheme("dark")

    expect(document.documentElement.style.getPropertyValue("--primary")).toBe(
      cobaltTheme.cssVars.dark.primary
    )
  })

  it.each(["cobalt", "default"] as const)(
    "synchronizes %s with manual color-mode changes without changing UI-theme storage",
    (uiTheme) => {
      localStorage.setItem(UI_THEME_STORAGE_KEY, uiTheme)
      const stopSynchronization = initializeUIThemeSynchronization()

      applyTheme("dark")

      expect(localStorage.getItem(UI_THEME_STORAGE_KEY)).toBe(uiTheme)
      expect(document.documentElement).toHaveClass("dark")
      expect(document.documentElement.style.getPropertyValue("--primary")).toBe(
        uiTheme === "cobalt" ? cobaltTheme.cssVars.dark.primary : ""
      )

      stopSynchronization()
    }
  )

  it("persists only the independent UI-theme preference and tolerates failure", () => {
    localStorage.setItem("theme", "dark")
    persistUITheme("default")
    expect(localStorage.getItem(UI_THEME_STORAGE_KEY)).toBe("default")
    expect(localStorage.getItem("theme")).toBe("dark")

    vi.spyOn(localStorage, "setItem").mockImplementation(() => {
      throw new Error("unavailable")
    })

    expect(() => persistUITheme("cobalt")).not.toThrow()
  })
})
