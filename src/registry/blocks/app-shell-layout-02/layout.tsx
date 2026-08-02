import type { CSSProperties } from "react"

import { SidebarInset, SidebarProvider } from "@/registry/primitives/sidebar"

import { AppHeader } from "./app-header"
import { AppSidebar } from "./app-sidebar"

const sidebarStyle = {
	"--sidebar-width": "14rem",
	"--sidebar-width-icon": "3rem",
} as CSSProperties

export default function AppShellLayoutTwo() {
	return (
		<SidebarProvider style={sidebarStyle}>
			<div className="relative flex h-dvh w-full overflow-hidden bg-background">
				<AppSidebar />
				<SidebarInset className="min-w-0 overflow-hidden shadow-none">
					<AppHeader />
					<div className="flex min-h-0 flex-1 flex-col gap-3 p-2 pt-0">
						<div className="grid shrink-0 grid-cols-1 gap-3 sm:grid-cols-3">
							{Array.from({ length: 3 }).map((_, index) => (
								<div
									aria-hidden="true"
									className="aspect-video rounded-lg border bg-muted/20"
									key={index}
								/>
							))}
						</div>
						<div className="min-h-64 flex-1 rounded-lg border bg-muted/20" />
					</div>
				</SidebarInset>
			</div>
		</SidebarProvider>
	)
}
