import type { Metadata } from "next"
import Link from "next/link"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages, getTranslations } from "next-intl/server"
import type { ReactNode } from "react"

import { LanguageSwitcher } from "@/components/language-switcher"
import { resolveLocale } from "@/i18n/config"

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

  return (
    <html lang={locale}>
      <body className="min-h-screen antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <header className="sticky top-0 z-10 border-b border-border/70 bg-background/90 backdrop-blur">
            <div className="mx-auto flex min-h-16 max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-3">
              <Link className="font-semibold tracking-tight" href="/">
                Fitodac UI
              </Link>
              <div className="flex items-center gap-3">
                <nav aria-label={t("mainNavigation")}>
                  <Link
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    href="/components"
                  >
                    {t("components")}
                  </Link>
                </nav>
                <LanguageSwitcher locale={locale} />
              </div>
            </div>
          </header>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
