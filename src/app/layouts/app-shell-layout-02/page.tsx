import type { Metadata } from "next"

import AppShellLayout from "@/registry/blocks/app-shell-layout-02/layout"

export const metadata: Metadata = {
	title: "App Shell Layout",
}

export default function AppShellLayoutPage() {
	return (
		<main className="fixed inset-0 z-20 bg-background">
			<AppShellLayout />
		</main>
	)
}
