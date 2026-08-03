import type { Metadata } from "next"

import AppShellLayout from "@/registry/blocks/layouts/app-shell-layout-03"

export const metadata: Metadata = {
	title: "App Shell Layout 03",
}

export default function AppShellLayoutThreePage() {
	return (
		<main className="fixed inset-0 z-20 bg-background">
			<AppShellLayout />
		</main>
	)
}
