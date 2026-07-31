import type { Metadata } from "next"
import Link from "next/link"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages, getTranslations } from "next-intl/server"
import type { ReactNode } from "react"

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
  const locale = await getLocale()
  const messages = await getMessages()
  const t = await getTranslations("Header")

  return (
    <html lang={locale}>
      <body className="min-h-screen antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <header className="sticky top-0 z-10 border-b border-border/70 bg-background/90 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
              <Link className="font-semibold tracking-tight" href="/">
                Fitodac UI
              </Link>
              <nav aria-label={t("mainNavigation")}>
                <Link
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  href="/components"
                >
                  {t("components")}
                </Link>
              </nav>
            </div>
          </header>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
