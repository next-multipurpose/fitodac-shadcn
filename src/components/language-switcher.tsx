"use client"

import { ChevronDownIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

import {
  isLocale,
  localeCookieName,
  type Locale,
} from "@/i18n/config"
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

const localeLabels: Record<Locale, string> = {
  en: "English",
  es: "Español",
}

type LanguageSwitcherProps = {
  locale: Locale
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const router = useRouter()
  const t = useTranslations("Header")

  function selectLocale(value: string) {
    if (!isLocale(value) || value === locale) {
      return
    }

    document.cookie = `${localeCookieName}=${value}; Path=/; Max-Age=31536000; SameSite=Lax`
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label={t("selectLanguage")}
          size="sm"
          type="button"
          variant="outline"
        >
          {locale.toUpperCase()}
          <ChevronDownIcon data-icon="inline-end" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t("language")}</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup
            onValueChange={selectLocale}
            value={locale}
          >
            {Object.entries(localeLabels).map(([value, label]) => (
              <DropdownMenuRadioItem key={value} value={value}>
                {label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
