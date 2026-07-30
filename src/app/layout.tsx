import type { Metadata } from "next"
import Link from "next/link"
import type { ReactNode } from "react"

import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Fitodac UI",
    template: "%s · Fitodac UI",
  },
  description: "Catálogo local de componentes de @fitodac/shadcn.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen antialiased">
        <header className="sticky top-0 z-10 border-b border-border/70 bg-background/90 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
            <Link className="font-semibold tracking-tight" href="/">
              Fitodac UI
            </Link>
            <nav aria-label="Navegación principal">
              <Link
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                href="/components"
              >
                Componentes
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}
