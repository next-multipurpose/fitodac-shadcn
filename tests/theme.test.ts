import { beforeEach, describe, expect, it, vi } from "vitest"

import {
  applyTheme,
  getStoredTheme,
  resolveTheme,
  toggleTheme,
} from "@/lib/theme"

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

describe("theme utilities", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", createStorage())
    localStorage.clear()
    document.documentElement.classList.remove("dark")
  })

  it.each([
    ["light", true, "light"],
    ["dark", false, "dark"],
    [null, false, "light"],
    [null, true, "dark"],
    ["invalid", true, "dark"],
  ] as const)(
    "resolves stored value %s with system dark %s as %s",
    (storedTheme, systemDark, expectedTheme) => {
      expect(resolveTheme(storedTheme, systemDark)).toBe(expectedTheme)
    }
  )

  it("applies the effective theme through the document class", () => {
    applyTheme("dark")
    expect(document.documentElement).toHaveClass("dark")

    applyTheme("light")
    expect(document.documentElement).not.toHaveClass("dark")
  })

  it("persists only the opposite effective theme", () => {
    expect(toggleTheme("light")).toBe("dark")
    expect(getStoredTheme()).toBe("dark")
    expect(document.documentElement).toHaveClass("dark")

    expect(toggleTheme("dark")).toBe("light")
    expect(getStoredTheme()).toBe("light")
    expect(document.documentElement).not.toHaveClass("dark")
  })
})
