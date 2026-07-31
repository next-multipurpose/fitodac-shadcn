import { NextIntlClientProvider } from "next-intl"
import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { hydrateRoot } from "react-dom/client"
import { renderToString } from "react-dom/server"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { AnimatedThemeToggler } from "@/components/animated-theme-toggler"
import englishMessages from "../messages/en.json"

type MediaListener = (event: MediaQueryListEvent) => void

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

function installMatchMedia({
  reducedMotion = false,
  systemDark = false,
}: {
  reducedMotion?: boolean
  systemDark?: boolean
} = {}) {
  const colorSchemeListeners = new Set<MediaListener>()

  const matchMedia = vi.fn((query: string) => {
    const isColorScheme = query === "(prefers-color-scheme: dark)"

    return {
      addListener: (listener: MediaListener) => {
        if (isColorScheme) {
          colorSchemeListeners.add(listener)
        }
      },
      addEventListener: (_type: string, listener: MediaListener) => {
        if (isColorScheme) {
          colorSchemeListeners.add(listener)
        }
      },
      dispatchEvent: () => true,
      matches: isColorScheme ? systemDark : reducedMotion,
      media: query,
      onchange: null,
      removeListener: (listener: MediaListener) => {
        colorSchemeListeners.delete(listener)
      },
      removeEventListener: (_type: string, listener: MediaListener) => {
        colorSchemeListeners.delete(listener)
      },
    } as MediaQueryList
  })

  vi.stubGlobal("matchMedia", matchMedia)

  return {
    changeSystemTheme(matches: boolean) {
      colorSchemeListeners.forEach((listener) =>
        listener({ matches } as MediaQueryListEvent)
      )
    },
    matchMedia,
  }
}

function renderToggler() {
  return render(
    <NextIntlClientProvider locale="en" messages={englishMessages}>
      <AnimatedThemeToggler />
    </NextIntlClientProvider>
  )
}

function togglerNode() {
  return (
    <NextIntlClientProvider locale="en" messages={englishMessages}>
      <AnimatedThemeToggler />
    </NextIntlClientProvider>
  )
}

describe("AnimatedThemeToggler", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", createStorage())
    localStorage.clear()
    document.documentElement.classList.remove("dark")
    Reflect.deleteProperty(document, "startViewTransition")
    installMatchMedia()
  })

  it("toggles and persists without View Transitions support", async () => {
    const user = userEvent.setup()
    renderToggler()

    const toggle = await screen.findByRole("button", {
      name: "Switch to dark theme",
    })
    await user.click(toggle)

    expect(document.documentElement).toHaveClass("dark")
    expect(localStorage.getItem("theme")).toBe("dark")
    expect(toggle).toHaveAccessibleName("Switch to light theme")
    expect(toggle).toHaveAttribute("aria-pressed", "true")
  })

  it("hydrates without a mismatch when bootstrap applied dark mode", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined)
    const container = document.createElement("div")

    container.innerHTML = renderToString(togglerNode())
    document.body.append(container)
    document.documentElement.classList.add("dark")
    installMatchMedia({ systemDark: true })

    let root: ReturnType<typeof hydrateRoot>
    await act(async () => {
      root = hydrateRoot(container, togglerNode())
    })

    expect(consoleError).not.toHaveBeenCalled()
    expect(
      await screen.findByRole("button", { name: "Switch to light theme" })
    ).toHaveAttribute("aria-pressed", "true")

    await act(async () => root.unmount())
    container.remove()
    consoleError.mockRestore()
  })

  it("follows system changes until a manual preference exists", async () => {
    const media = installMatchMedia()
    const user = userEvent.setup()
    renderToggler()

    await screen.findByRole("button", { name: "Switch to dark theme" })

    act(() => media.changeSystemTheme(true))
    expect(document.documentElement).toHaveClass("dark")

    await user.click(
      screen.getByRole("button", { name: "Switch to light theme" })
    )
    act(() => media.changeSystemTheme(true))

    expect(document.documentElement).not.toHaveClass("dark")
    expect(localStorage.getItem("theme")).toBe("light")
  })

  it("falls back when a View Transition throws", async () => {
    Object.defineProperty(document, "startViewTransition", {
      configurable: true,
      value: vi.fn(() => {
        throw new Error("transition unavailable")
      }),
    })

    const user = userEvent.setup()
    renderToggler()
    await user.click(
      await screen.findByRole("button", { name: "Switch to dark theme" })
    )

    expect(document.documentElement).toHaveClass("dark")
    expect(localStorage.getItem("theme")).toBe("dark")
  })

  it("does not reverse the theme when transition readiness fails after update", async () => {
    Object.defineProperty(document, "startViewTransition", {
      configurable: true,
      value: vi.fn((update: () => void) => {
        update()

        return { ready: Promise.reject(new Error("animation failed")) }
      }),
    })

    const user = userEvent.setup()
    renderToggler()
    await user.click(
      await screen.findByRole("button", { name: "Switch to dark theme" })
    )

    expect(document.documentElement).toHaveClass("dark")
    expect(localStorage.getItem("theme")).toBe("dark")
  })

  it("skips View Transitions when reduced motion is requested", async () => {
    installMatchMedia({ reducedMotion: true })
    const startViewTransition = vi.fn()
    Object.defineProperty(document, "startViewTransition", {
      configurable: true,
      value: startViewTransition,
    })

    const user = userEvent.setup()
    renderToggler()
    await user.click(
      await screen.findByRole("button", { name: "Switch to dark theme" })
    )

    expect(startViewTransition).not.toHaveBeenCalled()
    expect(document.documentElement).toHaveClass("dark")
  })
})
