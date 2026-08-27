"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { AnimatedThemeToggler } from "@/components/animated-theme-toggler"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeSelector } from "@/components/theme-selector"
import type { Locale } from "@/i18n/config"

export function MainHeader({
	locale,
	messages,
}: {
	locale: Locale
	messages: Record<string, string>
}) {
	const pathname = usePathname()

	if (!pathname) return null
	if (pathname.startsWith("/dashboard")) return null
	if (pathname.startsWith("/mail")) return null
	if (pathname.startsWith("/chat")) return null
	if (pathname.startsWith("/layouts/login/")) return null

	return (
		<header className="sticky top-0 z-10 border-b border-border/70 bg-background/90 backdrop-blur">
			<div className="mx-auto flex min-h-16 max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-3">
				<Link className="font-semibold tracking-tight" href="/">
					Fitodac UI
				</Link>
				<div className="flex items-center gap-3">
					<nav aria-label={messages.mainNavigation} className="md:space-x-5">
						<Link
							className="text-sm text-muted-foreground transition-colors hover:text-foreground"
							href="/components"
						>
							{messages.components}
						</Link>
						<Link
							className="text-sm text-muted-foreground transition-colors hover:text-foreground"
							href="/charts"
						>
							{messages.charts}
						</Link>
						<Link
							className="text-sm text-muted-foreground transition-colors hover:text-foreground"
							href="/blocks"
						>
							{messages.blocks}
						</Link>
						<Link
							className="text-sm text-muted-foreground transition-colors hover:text-foreground"
							href="/layouts"
						>
							{messages.layouts}
						</Link>
						<Link
							className="text-sm text-muted-foreground transition-colors hover:text-foreground"
							href="/dashboard"
							target="_blank"
						>
							{messages.dashboard}
						</Link>
					</nav>
					<LanguageSwitcher locale={locale} />
					<ThemeSelector />
					<AnimatedThemeToggler />
				</div>
			</div>
		</header>
	)
}
