import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages, getTranslations } from "next-intl/server"
import type { ReactNode } from "react"

import { MainHeader } from "@/components/main-header"
import { resolveLocale } from "@/i18n/config"
import { THEME_BOOTSTRAP_SCRIPT } from "@/lib/theme"
import {
  COBALT_THEME_CSS_TEXT,
  UI_THEME_BOOTSTRAP_SCRIPT,
} from "@/lib/ui-theme"

import "./globals.css"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata")

  return {
    title: {
      default: "Fitodac UI",
      template: "%s · Fitodac UI",
    },
    description: t("description"),
  }
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const locale = resolveLocale(await getLocale())
  const messages = await getMessages()
  const t = await getTranslations("Header")

  const headerMessages = {
    mainNavigation: t("mainNavigation"),
    components: t("components"),
    charts: t("charts"),
    blocks: t("blocks"),
    layouts: t("layouts"),
    dashboard: t("dashboard"),
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <style
          data-ui-theme-styles="cobalt"
          dangerouslySetInnerHTML={{ __html: COBALT_THEME_CSS_TEXT }}
        />
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }} />
        <script
          dangerouslySetInnerHTML={{ __html: UI_THEME_BOOTSTRAP_SCRIPT }}
        />
      </head>
      <body
        className="min-h-screen antialiased"
        suppressHydrationWarning
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <MainHeader locale={locale} messages={headerMessages} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
