"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import {
  applyUITheme,
  DEFAULT_UI_THEME,
  getInitialUITheme,
  isUITheme,
  persistUITheme,
  type UITheme,
} from "@/lib/ui-theme"
import { Button } from "@/registry/primitives/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/registry/primitives/dropdown-menu"

const themeLabels: Record<UITheme, "cobalt" | "default"> = {
  cobalt: "cobalt",
  default: "default",
}

export function ThemeSelector() {
  const t = useTranslations("Header")
  const [theme, setTheme] = React.useState<UITheme>(DEFAULT_UI_THEME)

  React.useEffect(() => {
    setTheme(getInitialUITheme())
  }, [])

  function selectTheme(value: string) {
    if (!isUITheme(value)) {
      return
    }

    const colorMode = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light"

    applyUITheme(value, colorMode)
    persistUITheme(value)
    setTheme(value)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label={t("selectTheme")}
          size="sm"
          type="button"
          variant="outline"
        >
          {t(themeLabels[theme])}
          <ChevronDownIcon data-icon="inline-end" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t("theme")}</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup onValueChange={selectTheme} value={theme}>
            <DropdownMenuRadioItem value="cobalt">
              {t("cobalt")}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="default">
              {t("default")}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
