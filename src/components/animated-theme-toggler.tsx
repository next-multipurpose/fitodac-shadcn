"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import {
  applyTheme,
  getEffectiveTheme,
  getStoredTheme,
  toggleTheme,
  type Theme,
} from "@/lib/theme"
import { initializeUIThemeSynchronization } from "@/lib/ui-theme"
import { Button } from "@/registry/primitives/button"

type DocumentWithViewTransition = Document & {
  startViewTransition?: (update: () => void) => {
    ready: Promise<void>
  }
}

export function AnimatedThemeToggler() {
  const t = useTranslations("Header")
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const [theme, setTheme] = React.useState<Theme | null>(null)

  React.useEffect(() => {
    let active = true
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)")
    const stopUIThemeSynchronization = initializeUIThemeSynchronization()

    function syncSystemTheme(event?: MediaQueryListEvent) {
      if (getStoredTheme()) {
        return
      }

      const nextTheme: Theme =
        (event?.matches ?? colorScheme.matches) ? "dark" : "light"

      applyTheme(nextTheme)
      setTheme(nextTheme)
    }

    queueMicrotask(() => {
      if (active) {
        setTheme(getEffectiveTheme())
      }
    })
    colorScheme.addEventListener("change", syncSystemTheme)

    return () => {
      active = false
      stopUIThemeSynchronization()
      colorScheme.removeEventListener("change", syncSystemTheme)
    }
  }, [])

  const effectiveTheme = theme ?? "light"
  const nextTheme = effectiveTheme === "dark" ? "light" : "dark"

  async function changeTheme() {
    let themeApplied = false
    const applyNextTheme = () => {
      if (themeApplied) {
        return
      }

      themeApplied = true
      setTheme(toggleTheme(effectiveTheme))
    }
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    const startViewTransition = (
      document as DocumentWithViewTransition
    ).startViewTransition?.bind(document)

    if (!startViewTransition || reduceMotion || !buttonRef.current) {
      applyNextTheme()
      return
    }

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    try {
      const transition = startViewTransition(applyNextTheme)

      await transition.ready
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 400,
          easing: "ease-in",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    } catch {
      applyNextTheme()
    }
  }

  return (
    <Button
      aria-label={
        nextTheme === "dark" ? t("switchToDarkTheme") : t("switchToLightTheme")
      }
      aria-pressed={effectiveTheme === "dark"}
      onClick={() => void changeTheme()}
      ref={buttonRef}
      size="icon-sm"
      title={
        nextTheme === "dark" ? t("switchToDarkTheme") : t("switchToLightTheme")
      }
      type="button"
      variant="outline"
    >
      {effectiveTheme === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}
